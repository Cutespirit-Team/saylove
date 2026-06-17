import { NextRequest } from "next/server";
import { redirectTo } from "@/lib/redirect";
import { getSupabaseServer } from "@/lib/supabase/server";

// 對應 checksignup.php（改用 Supabase Auth 的註冊）
// name 透過 metadata 帶入，由資料庫觸發器 handle_new_user 建立 profile。
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const has = (k: string) => form.get(k) !== null;
  if (!(has("email") && has("password") && has("name") && has("re_password"))) {
    return redirectTo("/");
  }

  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  const re_pass = String(form.get("re_password") ?? "");
  const name = String(form.get("name") ?? "").trim();

  if (!email) return redirectTo("/register?error=電子郵件未填");
  if (!password) return redirectTo("/register?error=密碼未填");
  if (!re_pass) return redirectTo("/register?error=確認密碼未填");
  if (!name) return redirectTo("/register?error=姓名未填");
  if (password !== re_pass) return redirectTo("/register?error=密碼和確認密碼不相符");

  const supabase = await getSupabaseServer();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) {
    if (/already|registered|exists/i.test(error.message)) {
      return redirectTo("/register?error=用戶名被佔用請嘗試另一個");
    }
    return redirectTo("/register?error=發生未知錯誤");
  }
  return redirectTo("/login?success=您的帳戶已成功創建");
}
