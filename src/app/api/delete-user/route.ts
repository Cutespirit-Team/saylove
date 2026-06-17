import { NextRequest } from "next/server";
import { redirectTo } from "@/lib/redirect";
import { getAdminProfile } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

// 對應 php/delete-user.php：管理員刪除會員（GET 連結）
// 刪除 auth.users 會連動刪除 profile / likes（FK on delete cascade）。
export async function GET(req: NextRequest) {
  const admin = await getAdminProfile();
  if (!admin) return redirectTo("/");

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return redirectTo("/manageuser");

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
  if (error) {
    return redirectTo("/manageuser?error=未知的錯誤");
  }
  return redirectTo("/manageuser?success=成功刪除");
}
