import { NextRequest } from "next/server";
import { redirectTo } from "@/lib/redirect";
import { getSupabaseServer } from "@/lib/supabase/server";

// 對應 php/forgot-p.php：寄送重設密碼信
// 改用 Supabase Auth：寄送含重設連結的信，點擊後會帶著 recovery session 導回 /forgotpassverify。
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const email = String(form.get("email") ?? "").trim();

  const origin =
    req.headers.get("x-forwarded-host") || req.headers.get("host")
      ? `${req.headers.get("x-forwarded-proto") || "http"}://${
          req.headers.get("x-forwarded-host") || req.headers.get("host")
        }`
      : process.env.SITE_URL || "http://localhost:3000";

  const supabase = await getSupabaseServer();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/forgotpassverify`,
  });

  // 不論信箱是否存在都導向同一頁（避免洩漏帳號是否存在）
  return redirectTo("/forgotpass?alert=若該信箱存在，重設密碼連結已寄出，請至信箱查看");
}
