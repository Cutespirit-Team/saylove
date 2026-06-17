"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { postForm } from "@/lib/clientApi";
import { showToast } from "@/lib/toast";
import SchoolSelect from "@/components/SchoolSelect";
import type { SchoolEntry } from "@/lib/school";
import { cardClass, fieldClass, labelClass, inputClass, inputReadonlyClass, primaryBtnClass, cardTitleClass } from "@/lib/uiClasses";

// 更新個人資料：前端送出,不重載。
export default function ProfileForm({
  name,
  email,
  genderDefault,
  schoolDefault,
  schools,
}: {
  name: string;
  email: string;
  genderDefault: string;
  schoolDefault: string;
  schools: SchoolEntry[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [, startTransition] = useTransition();

  const initial = (name || email || "?").trim().charAt(0).toUpperCase();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const res = await postForm("/api/updateprofiles", new FormData(e.currentTarget));
    setBusy(false);
    showToast(res.message ?? (res.ok ? "更新成功" : "更新失敗"), res.ok ? "success" : "warning");
    if (res.ok) startTransition(() => router.refresh());
  }

  return (
    <form onSubmit={onSubmit} className={cardClass}>
      {/* 頭像(姓名首字)+ 標題 */}
      <div className="tw-flex tw-items-center tw-gap-3 tw-mb-5 tw-pb-4 tw-border-b tw-border-[#f0f0f4]">
        <div className="tw-w-12 tw-h-12 tw-rounded-full tw-bg-[#3b5999] tw-text-white tw-flex tw-items-center tw-justify-center tw-text-[20px] tw-font-bold tw-shrink-0">
          {initial}
        </div>
        <div className="tw-min-w-0">
          <h4 className={cardTitleClass}>個人資料</h4>
          <p className="tw-m-0 tw-text-[13px] tw-text-[#999] tw-truncate">{email}</p>
        </div>
      </div>

      <div className={fieldClass}>
        <label className={labelClass} htmlFor="name">姓名</label>
        <input type="text" id="name" name="name" required defaultValue={name} className={inputClass} />
      </div>

      <div className={fieldClass}>
        <label className={labelClass} htmlFor="email">電子郵件</label>
        <input type="email" id="email" name="email" defaultValue={email} readOnly className={inputReadonlyClass} />
      </div>

      <div className={fieldClass}>
        <label className={labelClass} htmlFor="gender">性別</label>
        <select id="gender" name="gender" required defaultValue={genderDefault} className={inputClass}>
          <option value="0">請選擇性別</option>
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
      </div>

      <div className={fieldClass}>
        <label className={labelClass}>高中</label>
        <SchoolSelect name="school" schools={schools} defaultCode={schoolDefault} inputClassName={inputClass} />
      </div>

      <button type="submit" className={primaryBtnClass} name="update" disabled={busy}>
        {busy ? "更新中…" : "更新以上資料"}
      </button>
    </form>
  );
}
