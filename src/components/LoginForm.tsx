"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { showToast } from "@/lib/toast";

// 前端登入：不走整頁 POST，避免登入後整頁重載（轉圈）。
// 成功後以 client-side 導向首頁，並 refresh 讓導覽列更新登入狀態。
// 「登入成功」提示在前端直接顯示，不放進網址（避免反射型攻擊）。
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
    // 成功提示在前端直接顯示（不經網址），再 client-side 導向首頁 + 更新導覽列
    showToast("登入成功!", "success");
    router.replace("/");
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
