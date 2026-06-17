"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { postForm } from "@/lib/clientApi";
import { showToast } from "@/lib/toast";

// 按讚 / 取消讚：前端送出,不重載、不轉圈。
export default function LikeButton({
  postid,
  school,
  liked,
}: {
  postid: number;
  school: string;
  liked: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (busy || pending) return;
    setBusy(true);
    const fd = new FormData();
    fd.append("messagelikes", "YES");
    fd.append("school", school);
    fd.append("postid", String(postid));
    const res = await postForm("/api/likes", fd);
    setBusy(false);
    if (!res.ok) {
      showToast(res.message ?? "操作失敗", "warning");
      return;
    }
    startTransition(() => router.refresh());
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ border: "none", backgroundColor: "transparent", float: "left" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={liked ? "/img/heart_red.png" : "/img/heart.png"} className="heartpost" alt="" />
    </button>
  );
}
