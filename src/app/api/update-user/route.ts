import { NextRequest } from "next/server";
import { redirectTo } from "@/lib/redirect";
import { getAdminProfile } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { validate, htmlentities } from "@/lib/sanitize";

// 對應 php/update-user.php：管理員更新會員資料
// 修改 email / password 需透過 Supabase admin API（service_role）。
export async function POST(req: NextRequest) {
  const admin = await getAdminProfile();
  if (!admin) return redirectTo("/");

  const form = await req.formData();
  if (form.get("update") === null) {
    return redirectTo("/manageuser");
  }

  const name = htmlentities(validate(String(form.get("name") ?? "")));
  const email = htmlentities(validate(String(form.get("email") ?? "")));
  const password = String(form.get("password") ?? ""); // 留空則不變更
  const id = String(form.get("id") ?? "");

  if (!name) return redirectTo(`/manageuser?id=${id}&error=姓名未填`);
  if (!email) return redirectTo(`/manageuser?id=${id}&error=電子郵件未填`);

  const supabaseAdmin = getSupabaseAdmin();

  // 更新 auth.users 的 email（與密碼，如有提供）
  const authUpdate: { email: string; password?: string } = { email };
  if (password) authUpdate.password = password;
  const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(id, authUpdate);
  if (authError) {
    return redirectTo(`/manageuser?id=${id}&error=未知的錯誤`);
  }

  // 同步 profiles 的 name / email
  const { error } = await supabaseAdmin.from("profiles").update({ name, email }).eq("id", id);
  if (error) {
    return redirectTo(`/manageuser?id=${id}&error=未知的錯誤`);
  }
  return redirectTo("/manageuser?success=更新成功");
}
