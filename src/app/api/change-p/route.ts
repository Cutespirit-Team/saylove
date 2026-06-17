import { NextRequest } from "next/server";
import { redirectTo } from "@/lib/redirect";
import { getSupabaseServer } from "@/lib/supabase/server";

// 對應 change-p.php（改用 Supabase Auth：先用舊密碼重新驗證，再更新密碼）
export async function POST(req: NextRequest) {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirectTo("/");

  const form = await req.formData();
  if (form.get("op") === null || form.get("np") === null || form.get("c_np") === null) {
    return redirectTo("/");
  }
  const op = String(form.get("op") ?? "");
  const np = String(form.get("np") ?? "");
  const c_np = String(form.get("c_np") ?? "");

  if (!op) return redirectTo("/profiles?error=舊密碼未填");
  if (!np) return redirectTo("/profiles?error=新密碼未填");
  if (np !== c_np) return redirectTo("/profiles?error=新密碼和確認新密碼不符");
  if (np.length < 8 || np.length > 16) {
    return redirectTo("/profiles?error=新密碼小於8或大於16");
  }

  // 用舊密碼重新驗證（對應原本「比對舊密碼」）
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: op,
  });
  if (signInError) {
    return redirectTo("/profiles?error=密碼錯誤");
  }

  const { error } = await supabase.auth.updateUser({ password: np });
  if (error) {
    return redirectTo("/profiles?error=密碼錯誤");
  }
  return redirectTo("/profiles?success=您的密碼已經成功變更");
}
