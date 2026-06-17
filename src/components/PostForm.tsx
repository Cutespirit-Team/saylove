"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postForm } from "@/lib/clientApi";
import { showToast } from "@/lib/toast";

// 發佈貼文：前端送出,成功後 client 導向首頁,不整頁重載、不轉圈。
export default function PostForm({ name, school }: { name: string; school: string }) {
  const router = useRouter();
  const [sentence, setSentence] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    if (!sentence.trim()) {
      showToast("想說的話未填", "warning");
      return;
    }
    setBusy(true);
    const fd = new FormData();
    fd.append("sentence", sentence);
    fd.append("school", school);
    const res = await postForm("/api/updateposts", fd);
    if (!res.ok) {
      setBusy(false);
      showToast(res.message ?? "發佈失敗", "warning");
      return;
    }
    showToast("發佈成功", "success");
    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit}>
      <h4 className="pgtitle">新增貼文</h4>
      <hr />
      <br />
      <div className="form-group">
        <label htmlFor="name">您的姓名</label>
        <input type="text" className="form-control" id="name" name="name" defaultValue={name} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="school">發布學校</label>
        <input type="text" className="form-control" id="school" name="school" defaultValue={school} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="sentence">想說的話</label>
        <input
          type="text"
          className="form-control"
          id="sentence"
          name="sentence"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" name="update" disabled={busy}>
        發布
      </button>
    </form>
  );
}
