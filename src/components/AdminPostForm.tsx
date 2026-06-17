"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postForm } from "@/lib/clientApi";
import { showToast } from "@/lib/toast";

// 管理員更改貼文：前端送出,不重載。
export default function AdminPostForm({
  id,
  writer,
  sentence,
  school,
  posttime,
}: {
  id: number | string;
  writer: string;
  sentence: string;
  school: string;
  posttime: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const res = await postForm("/api/update-post", new FormData(e.currentTarget));
    setBusy(false);
    showToast(res.message ?? (res.ok ? "更新成功" : "更新失敗"), res.ok ? "success" : "warning");
    if (res.ok) router.push("/manageposts");
  }

  return (
    <form onSubmit={onSubmit}>
      <h4 className="display-4 text-center">更改貼文</h4>
      <hr />
      <br />
      <input type="hidden" name="id" defaultValue={String(id)} />
      <div className="form-group">
        <label htmlFor="writer">姓名</label>
        <input type="text" className="form-control" id="writer" name="writer" defaultValue={writer} />
      </div>
      <div className="form-group">
        <label htmlFor="sentence">貼文</label>
        <input type="text" className="form-control" id="sentence" name="sentence" defaultValue={sentence} />
      </div>
      <div className="form-group">
        <label htmlFor="school">學校</label>
        <input type="text" className="form-control" id="school" name="school" defaultValue={school} />
      </div>
      <div className="form-group">
        <label htmlFor="posttime">時間</label>
        <input type="text" className="form-control" id="posttime" name="posttime" defaultValue={posttime} />
        <button type="submit" className="btn btn-primary" disabled={busy}>
          更新
        </button>
      </div>
    </form>
  );
}
