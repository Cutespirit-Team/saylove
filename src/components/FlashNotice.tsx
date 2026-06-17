"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// 重現原本各頁 ?error= / ?success= 觸發的 notice.showToast 行為。
declare global {
  interface Window {
    Notice?: new () => { showToast: (o: { text: string; type: string }) => void };
  }
}

function ensureNoticeScript(): Promise<void> {
  return new Promise((resolve) => {
    if (window.Notice) return resolve();
    const existing = document.getElementById("notice-lib");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const s = document.createElement("script");
    s.id = "notice-lib";
    s.src = "/notice/dist/notice.min.js";
    s.onload = () => resolve();
    document.body.appendChild(s);
  });
}

export default function FlashNotice() {
  const params = useSearchParams();
  const error = params.get("error");
  const success = params.get("success");

  useEffect(() => {
    if (!error && !success) return;
    ensureNoticeScript().then(() => {
      if (!window.Notice) return;
      const notice = new window.Notice();
      if (error) notice.showToast({ text: error, type: "warning" });
      if (success) notice.showToast({ text: success, type: "success" });
    });
  }, [error, success]);

  return null;
}
