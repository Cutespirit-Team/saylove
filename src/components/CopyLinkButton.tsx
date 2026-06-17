"use client";

import { showToast } from "@/lib/toast";

// 分享按鈕：點一下複製文章連結（取代原本獨立的「點我複製文章連結」按鈕）。
export default function CopyLinkButton({ link }: { link: string }) {
  const onClick = () => {
    const done = () => showToast("已複製文章連結", "success");
    const fallback = () => {
      const textArea = document.createElement("textarea");
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 999999);
      try {
        document.execCommand("Copy");
        done();
      } catch {
        /* noop */
      }
      document.body.removeChild(textArea);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(link).then(done).catch(fallback);
    } else {
      fallback();
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      title="點我複製文章連結"
      aria-label="複製文章連結"
      style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/share.png" alt="分享" />
    </button>
  );
}
