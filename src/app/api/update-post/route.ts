import { NextRequest } from "next/server";
import { redirectTo } from "@/lib/redirect";
import { getAdminProfile } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import { validate } from "@/lib/sanitize";

// 對應 php/update-post.php：管理員更新貼文
export async function POST(req: NextRequest) {
  const admin = await getAdminProfile();
  if (!admin) return redirectTo("/");

  const form = await req.formData();
  if (form.get("update") === null) {
    return redirectTo("/manageposts");
  }

  const writer = validate(String(form.get("writer") ?? ""));
  const sentence = validate(String(form.get("sentence") ?? ""));
  const school = validate(String(form.get("school") ?? ""));
  const posttime = validate(String(form.get("posttime") ?? ""));
  const id = validate(String(form.get("id") ?? ""));

  if (!writer) return redirectTo(`/manageuser?id=${id}&error=姓名未填`);
  if (!sentence) return redirectTo(`/manageuser?id=${id}&error=貼文內容未填`);
  if (!school) return redirectTo(`/manageuser?id=${id}&error=學校未填`);

  const supabase = await getSupabaseServer();
  const { error } = await supabase
    .from("posts")
    .update({ writer, sentence, school, posttime })
    .eq("id", Number(id));
  if (error) {
    return redirectTo(`/manageposts?id=${id}&error=未知的錯誤`);
  }
  return redirectTo("/manageposts?success=更新成功");
}
