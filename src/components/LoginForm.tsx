"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

// 前端登入：不走整頁 POST，避免登入後整頁重載（轉圈）。
// 成功後以 client-side 導向首頁，並 refresh 讓導覽列更新登入狀態。
function showToast(text: string, type: "warning" | "success") {
  const run = () => {
    if (window.Notice) new window.Notice().showToast({ text, type });
  };
  if (window.Notice) return run();
  const existing = document.getElementById("notice-lib");
  if (existing) {
    existing.addEventListener("load", run);
    return;
  }
  const s = document.createElement("script");
  s.id = "notice-lib";
  s.src = "/notice/dist/notice.min.js";
  s.onload = run;
  document.body.appendChild(s);
}

export default function LoginForm({ header, chatUrl }: { header?: string; chatUrl: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");

    if (!email) return showToast("電子郵件未填", "warning");
    if (!password) return showToast("密碼未填", "warning");

    setLoading(true);
    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      showToast("錯誤的帳號或密碼", "warning");
      return;
    }
    if (header === "chatlogin") {
      window.location.href = chatUrl;
      return;
    }
    // client-side 導向 + 重新整理 server 元件（讓 layout 的導覽列更新為已登入）
    router.replace("/?success=登入成功!");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="input_field">
        <input type="email" placeholder="電子郵件" name="email" className="input" />
      </div>
      <div className="input_field">
        <input type="password" placeholder="密碼" name="password" className="input" />
      </div>
      <button className="btn_love" type="submit" disabled={loading}>
        登入
      </button>
    </form>
  );
}
