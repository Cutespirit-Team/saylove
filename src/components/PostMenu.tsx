"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { postForm } from "@/lib/clientApi";
import { showToast } from "@/lib/toast";
import { useConfirm } from "@/components/ConfirmProvider";

// 貼文右上角三個點。作者本人或管理員可「修改貼文 / 刪除貼文」。
export default function PostMenu({
  postid,
  sentence,
  canManage,
}: {
  postid: number;
  sentence: string;
  canManage: boolean;
}) {
  const router = useRouter();
  const confirm = useConfirm();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(sentence);
  const [, startTransition] = useTransition();

  // 不能管理的人：維持原本單純的圖示
  if (!canManage) {
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

  async function onSaveEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    if (!draft.trim()) return showToast("想說的話未填", "warning");
    setBusy(true);
    const fd = new FormData();
    fd.append("id", String(postid));
    fd.append("sentence", draft);
    const res = await postForm("/api/edit-post", fd);
    setBusy(false);
    showToast(res.message ?? (res.ok ? "已修改" : "修改失敗"), res.ok ? "success" : "warning");
    if (res.ok) {
      setEditing(false);
      startTransition(() => router.refresh());
    }
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
          className="tw-absolute tw-right-0 tw-top-full tw-z-[1000] tw-min-w-[120px] tw-bg-white tw-rounded-[8px] tw-border tw-border-[#ddd] tw-shadow-[0_2px_10px_rgba(0,0,0,0.15)] tw-overflow-hidden"
        >
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setDraft(sentence);
              setEditing(true);
            }}
            className="tw-block tw-w-full tw-text-left tw-px-[14px] tw-py-2 tw-border-0 tw-bg-transparent tw-text-[#3b5999] tw-cursor-pointer tw-whitespace-nowrap hover:tw-bg-[#f3f4f8]"
          >
            修改貼文
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={busy}
            className="tw-block tw-w-full tw-text-left tw-px-[14px] tw-py-2 tw-border-0 tw-bg-transparent tw-text-[#c0392b] tw-cursor-pointer tw-whitespace-nowrap hover:tw-bg-[#fdecea]"
          >
            刪除貼文
          </button>
        </div>
      )}

      {editing && (
        <div
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditing(false);
          }}
          className="tw-fixed tw-inset-0 tw-z-[2147483600] tw-flex tw-items-center tw-justify-center tw-p-4 tw-bg-[rgba(20,20,40,0.45)] tw-backdrop-blur-[2px] tw-animate-confirm-fade motion-reduce:tw-animate-none"
        >
          <form
            onSubmit={onSaveEdit}
            className="tw-w-full tw-max-w-[400px] tw-bg-white tw-rounded-[14px] tw-p-[22px] tw-shadow-[0_16px_48px_rgba(20,20,40,0.25)] tw-animate-confirm-pop motion-reduce:tw-animate-none"
          >
            <h3 className="tw-m-0 tw-mb-3 tw-text-[18px] tw-font-extrabold tw-text-[#3b5999]">修改貼文</h3>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={3}
              autoFocus
              className="tw-w-full tw-box-border tw-rounded-[8px] tw-border tw-border-[#ccc] tw-p-[10px] tw-text-[14.5px] tw-leading-[1.6] tw-text-[#333] tw-resize-y focus:tw-outline-none focus:tw-border-[#3b5999]"
            />
            <div className="tw-flex tw-justify-end tw-gap-[10px] tw-mt-4">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="tw-border-0 tw-rounded-[9px] tw-px-[18px] tw-py-2 tw-text-[14px] tw-font-semibold tw-cursor-pointer tw-bg-[#eef0f4] tw-text-[#555] hover:tw-bg-[#e3e6ee]"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={busy}
                className="tw-border-0 tw-rounded-[9px] tw-px-[18px] tw-py-2 tw-text-[14px] tw-font-semibold tw-cursor-pointer tw-bg-[#3b5999] tw-text-white hover:tw-brightness-95 disabled:tw-opacity-60"
              >
                儲存
              </button>
            </div>
          </form>
        </div>
      )}
    </span>
  );
}
