import { NextRequest } from "next/server";
import { redirectTo } from "@/lib/redirect";
import { getAdminProfile } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import { validate } from "@/lib/sanitize";

// 對應 php/delete-post.php：管理員刪除貼文（GET 連結）
export async function GET(req: NextRequest) {
  const admin = await getAdminProfile();
  if (!admin) return redirectTo("/");

  const idParam = req.nextUrl.searchParams.get("id");
  if (idParam === null) return redirectTo("/manageposts");

  const id = validate(idParam);
  const supabase = await getSupabaseServer();
  const { error } = await supabase.from("posts").delete().eq("id", Number(id));
  if (error) {
    return redirectTo("/manageposts?error=未知的錯誤");
  }
  return redirectTo("/manageposts?success=成功刪除");
}
