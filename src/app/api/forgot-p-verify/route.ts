import { NextRequest } from "next/server";
import { redirectTo } from "@/lib/redirect";
import { getSupabaseServer } from "@/lib/supabase/server";

// 對應 php/forgot-p-verify.php：設定新密碼
// 使用者是經由重設信連結進來（已具備 recovery session），故以 updateUser 直接改密碼。
export async function POST(req: NextRequest) {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  const re_password = String(form.get("re_password") ?? "");

  if (!password) return redirectTo("/forgotpassverify?error=密碼為空");
  if (password !== re_password) {
    return redirectTo("/forgotpassverify?error=新密碼和確認新密碼不符或其他錯誤");
  }
  if (!user) {
    return redirectTo("/forgotpassverify?error=連結已失效，請重新申請重設密碼");
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return redirectTo("/forgotpassverify?error=您的電子郵件或驗證碼錯誤!");
  }
  return redirectTo("/forgotpassverify?success=您的密碼已經成功變更");
}
