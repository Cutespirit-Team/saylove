"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { postForm } from "@/lib/clientApi";
import { showToast } from "@/lib/toast";

// 管理員刪除（貼文 / 會員）：前端送出 + 確認,不重載。
export default function DeleteButton({
  url,
  id,
  confirmText = "確定要刪除嗎?",
}: {
  url: string;
  id: string | number;
  confirmText?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [, startTransition] = useTransition();

  async function onClick() {
    if (busy) return;
    if (!window.confirm(confirmText)) return;
    setBusy(true);
    const fd = new FormData();
    fd.append("id", String(id));
    const res = await postForm(url, fd);
    setBusy(false);
    showToast(res.message ?? (res.ok ? "成功刪除" : "刪除失敗"), res.ok ? "success" : "warning");
    if (res.ok) startTransition(() => router.refresh());
  }

  return (
    <button type="button" className="btn btn-danger" onClick={onClick} disabled={busy}>
      刪除
    </button>
  );
}
