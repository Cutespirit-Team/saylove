"use client";

import { useState } from "react";
import { postForm } from "@/lib/clientApi";
import { showToast } from "@/lib/toast";

// 變更密碼：前端送出,不重載。
export default function ChangePasswordForm() {
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const formEl = e.currentTarget;
    setBusy(true);
    const res = await postForm("/api/change-p", new FormData(formEl));
    setBusy(false);
    showToast(res.message ?? (res.ok ? "密碼已變更" : "變更失敗"), res.ok ? "success" : "warning");
    if (res.ok) formEl.reset();
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="sub_title">變更密碼</h2>
      <div className="form-group">
        <label>舊密碼</label>
        <input type="password" className="label_name" name="op" placeholder="Old Password" />
      </div>
      <div className="form-group">
        <label>新密碼</label>
        <input type="password" className="label_name" name="np" placeholder="New Password" />
      </div>
      <div className="form-group">
        <label>確認新密碼</label>
        <input type="password" className="label_name" name="c_np" placeholder="Confirm New Password" />
      </div>
      <button type="submit" className="btn btn-primary" name="change-p" disabled={busy}>
        變更密碼
      </button>
    </form>
  );
}
