"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { postForm } from "@/lib/clientApi";
import { showToast } from "@/lib/toast";

// 留言：前端送出,不重載、不轉圈。
export default function CommentForm({
  postid,
  school,
  loggedIn,
}: {
  postid: number;
  school: string;
  loggedIn: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);

  // 未登入：不顯示輸入框,改成提示文字（連到登入頁）
  if (!loggedIn) {
    return (
      <Link href="/login" style={{ color: "#888", fontSize: "14px", textDecoration: "none" }}>
        請先登入才能留言喔!
      </Link>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || pending) return;
    if (!value.trim()) return;
    setBusy(true);
    const fd = new FormData();
    fd.append("message", value);
    fd.append("postid", String(postid));
    fd.append("school", school);
    const res = await postForm("/api/message", fd);
    setBusy(false);
    if (!res.ok) {
      showToast(res.message ?? "留言失敗", "warning");
      return;
    }
    setValue("");
    startTransition(() => router.refresh());
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="message"
        className="textpost"
        placeholder={loggedIn ? "留言..." : "請先登入才能留言喔!"}
        spellCheck={false}
        data-ms-editor="true"
        required
        readOnly={!loggedIn}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="sqdOP yWX7d    y3zKF     " type="submit" disabled={!loggedIn || busy}>
        <div className="_7UhW9   xLCgt        qyrsm      gtFbE     uL8Hv        T0kll ">發佈</div>
      </button>
    </form>
  );
}
