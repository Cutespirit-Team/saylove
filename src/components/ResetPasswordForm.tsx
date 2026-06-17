"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { showToast } from "@/lib/toast";

// 設定新密碼：使用者由重設信連結進來(已具 recovery session),前端 updateUser。
export default function ResetPasswordForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password") ?? "");
    const re_password = String(fd.get("re_password") ?? "");
    if (!password) return showToast("密碼為空", "warning");
    if (password !== re_password) return showToast("新密碼和確認新密碼不符", "warning");

    setBusy(true);
    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      showToast("連結已失效或發生錯誤,請重新申請重設密碼", "warning");
      return;
    }
    showToast("您的密碼已經成功變更", "success");
    router.push("/login");
  }

  return (
    <form onSubmit={onSubmit}>
      <h4 className="display-4 text-center">設定新密碼</h4>
      <hr />
      <br />
      <div className="form-group">
        <label htmlFor="password">請輸入新密碼</label>
        <input type="password" className="form-control" id="password" name="password" required placeholder="Password" />
      </div>
      <div className="form-group">
        <label htmlFor="re_password">確認新密碼</label>
        <input
          type="password"
          className="form-control"
          id="re_password"
          name="re_password"
          required
          placeholder="Re_password"
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={busy}>
        確認變更
      </button>
    </form>
  );
}
