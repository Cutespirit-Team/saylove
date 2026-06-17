"use client";

import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { showToast } from "@/lib/toast";

// 忘記密碼：前端寄送重設連結,提示走 toast(不經網址)。
export default function ForgotForm() {
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    if (!email) return showToast("請輸入電子郵件", "warning");

    setBusy(true);
    const supabase = createSupabaseBrowser();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/forgotpassverify`,
    });
    setBusy(false);
    // 不論信箱是否存在都給同樣訊息(避免洩漏帳號是否存在)
    showToast("若該信箱存在,重設密碼連結已寄出,請至信箱查看", "success");
  }

  return (
    <form onSubmit={onSubmit}>
      <h4 className="display-4 text-center">忘記密碼</h4>
      <hr />
      <br />
      <div className="form-group">
        <label htmlFor="email">請輸入您的電子郵件</label>
        <input type="email" className="form-control" id="email" name="email" required />
      </div>
      <button type="submit" className="btn btn-primary" disabled={busy}>
        下一步
      </button>
    </form>
  );
}
