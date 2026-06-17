"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { postForm } from "@/lib/clientApi";
import { showToast } from "@/lib/toast";
import SchoolSelect from "@/components/SchoolSelect";
import type { SchoolEntry } from "@/lib/school";

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
    <form onSubmit={onSubmit}>
      <h4 className="pgtitle">個人資料</h4>
      <hr />
      <br />
      <div className="form-group">
        <label htmlFor="name">姓名</label>
        <input type="text" className="label_name" id="name" name="name" required defaultValue={name} />
      </div>
      <div className="form-group">
        <label htmlFor="email">電子郵件</label>
        <input type="email" className="label_name" id="email" name="email" defaultValue={email} readOnly />
      </div>
      <div className="form-group">
        <label>
          性別:
          <select name="gender" id="gender" required className="selector" defaultValue={genderDefault}>
            <option value="0">請選擇性別</option>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </label>
      </div>
      <div className="form-group">
        <label className="label_name">高中:</label>
        <SchoolSelect name="school" schools={schools} defaultCode={schoolDefault} />
      </div>
      <button type="submit" className="btn btn-primary" name="update" disabled={busy}>
        更新以上資料
      </button>
    </form>
  );
}
