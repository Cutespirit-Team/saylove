"use client";

import { useState } from "react";
import { postForm } from "@/lib/clientApi";
import { showToast } from "@/lib/toast";
import { cardClass, fieldClass, labelClass, inputClass, primaryBtnClass, cardTitleClass } from "@/lib/uiClasses";

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
    <form onSubmit={onSubmit} className={cardClass}>
      <h2 className={cardTitleClass}>變更密碼</h2>
      <p className="tw-m-0 tw-mb-4 tw-text-[13px] tw-text-[#999]">密碼長度需介於 8~16 字。</p>
      <div className={fieldClass}>
        <label className={labelClass}>舊密碼</label>
        <input type="password" className={inputClass} name="op" placeholder="輸入目前的密碼" />
      </div>
      <div className={fieldClass}>
        <label className={labelClass}>新密碼</label>
        <input type="password" className={inputClass} name="np" placeholder="輸入新密碼" />
      </div>
      <div className={fieldClass}>
        <label className={labelClass}>確認新密碼</label>
        <input type="password" className={inputClass} name="c_np" placeholder="再輸入一次新密碼" />
      </div>
      <button type="submit" className={primaryBtnClass} name="change-p" disabled={busy}>
        {busy ? "處理中…" : "變更密碼"}
      </button>
    </form>
  );
}
