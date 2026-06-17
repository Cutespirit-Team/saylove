import { NextRequest } from "next/server";
import { redirectTo } from "@/lib/redirect";
import { getSupabaseServer } from "@/lib/supabase/server";

// 對應 checklogin.php（改用 Supabase Auth 的密碼登入）
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const emailRaw = form.get("email");
  const passwordRaw = form.get("password");
  const header = String(form.get("header") ?? "");

  if (emailRaw === null || passwordRaw === null) {
    return redirectTo("/");
  }
  const email = String(emailRaw).trim();
  const password = String(passwordRaw);

  if (!email) return redirectTo("/login?error=電子郵件未填");
  if (!password) return redirectTo("/login?error=密碼未填");

  const supabase = await getSupabaseServer();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return redirectTo("/login?error=錯誤的帳號或密碼");
  }

  if (header === "chatlogin") {
    return redirectTo(process.env.CHAT_URL || "https://chat.cutespirit.org/");
  }
  return redirectTo("/?success=登入成功!");
}
