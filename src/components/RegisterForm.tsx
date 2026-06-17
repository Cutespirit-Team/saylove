"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { showToast } from "@/lib/toast";

// 前端註冊：不整頁重載,提示走 toast(不經網址)。
export default function RegisterForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    const re_password = String(fd.get("re_password") ?? "");

    if (!name) return showToast("姓名未填", "warning");
    if (!email) return showToast("電子郵件未填", "warning");
    if (!password) return showToast("密碼未填", "warning");
    if (password !== re_password) return showToast("密碼和確認密碼不相符", "warning");

    setBusy(true);
    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
    setBusy(false);
    if (error) {
      showToast(/already|registered|exists/i.test(error.message) ? "此信箱已被註冊" : "註冊失敗", "warning");
      return;
    }
    showToast("您的帳戶已成功創建", "success");
    router.push("/login");
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="input_field">
        <input type="text" placeholder="姓名" name="name" className="input" />
      </div>
      <div className="input_field">
        <input type="email" placeholder="電子郵件" name="email" className="input" />
      </div>
      <div className="input_field">
        <input type="password" placeholder="密碼" id="password-field" name="password" className="input" />
      </div>
      <div className="input_field">
        <input type="password" placeholder="確認密碼" name="re_password" className="input" />
      </div>
      <button className="btn_love" type="submit" disabled={busy}>
        註冊
      </button>
    </form>
  );
}
