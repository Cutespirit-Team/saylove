"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { postForm } from "@/lib/clientApi";
import { showToast } from "@/lib/toast";
import { useConfirm } from "@/components/ConfirmProvider";

// 貼文右上角三個點。可刪除者（作者本人或管理員）點開會出現「刪除貼文」。
export default function PostMenu({ postid, canDelete }: { postid: number; canDelete: boolean }) {
  const router = useRouter();
  const confirm = useConfirm();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [, startTransition] = useTransition();

  // 不能刪的人：維持原本單純的圖示
  if (!canDelete) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src="/img/dot.png" className="dotpost" alt="" />;
  }

  async function onDelete() {
    if (busy) return;
    setOpen(false);
    const ok = await confirm({
      title: "刪除貼文",
      message: "確定要刪除這篇貼文嗎?此動作無法復原。",
      confirmText: "刪除",
      danger: true,
    });
    if (!ok) return;
    setBusy(true);
    const fd = new FormData();
    fd.append("id", String(postid));
    const res = await postForm("/api/delete-post", fd);
    setBusy(false);
    showToast(res.message ?? (res.ok ? "已刪除" : "刪除失敗"), res.ok ? "success" : "warning");
    if (res.ok) startTransition(() => router.refresh());
  }

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0 }}
        aria-label="貼文選單"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/dot.png" className="dotpost" alt="" />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "100%",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 6,
            boxShadow: "0 2px 8px rgba(0,0,0,.15)",
            zIndex: 1000,
            minWidth: 110,
          }}
        >
          <button
            type="button"
            onClick={onDelete}
            disabled={busy}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "8px 14px",
              border: "none",
              background: "transparent",
              color: "#c0392b",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            刪除貼文
          </button>
        </div>
      )}
    </span>
  );
}
