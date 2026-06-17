"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!loggedIn || busy || pending) return;
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
