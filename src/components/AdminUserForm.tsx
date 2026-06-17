"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { postForm } from "@/lib/clientApi";
import { showToast } from "@/lib/toast";

// 管理員更改會員資料：前端送出,不重載。密碼留空則不變更。
export default function AdminUserForm({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const res = await postForm("/api/update-user", new FormData(e.currentTarget));
    setBusy(false);
    showToast(res.message ?? (res.ok ? "更新成功" : "更新失敗"), res.ok ? "success" : "warning");
    if (res.ok) router.push("/manageuser");
  }

  return (
    <form onSubmit={onSubmit}>
      <h4 className="display-4 text-center">更改資料</h4>
      <hr />
      <br />
      <input type="hidden" name="id" defaultValue={id} />
      <div className="form-group">
        <label htmlFor="name">姓名</label>
        <input type="text" className="form-control" id="name" name="name" defaultValue={name} />
      </div>
      <div className="form-group">
        <label htmlFor="email">電子郵件</label>
        <input type="email" className="form-control" id="email" name="email" defaultValue={email} />
      </div>
      <div className="form-group">
        <label htmlFor="password">密碼（留空則不變更）</label>
        <input type="text" className="form-control" id="password" name="password" placeholder="留空則不變更" />
      </div>
      <button type="submit" className="btn btn-primary" disabled={busy}>
        更新
      </button>{" "}
      <Link href="/manageuser" className="link-primary">
        會員列表
      </Link>
    </form>
  );
}
