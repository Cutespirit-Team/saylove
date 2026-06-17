"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { showToast } from "@/lib/toast";

// 前端登出：不走整頁 route handler，避免登出後整頁重載（轉圈）。
export default function LogoutLink() {
  const router = useRouter();

  async function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    // 成功提示在前端直接顯示（不經網址），再 client-side 導向 + 更新導覽列
    showToast("登出成功!", "success");
    router.replace("/");
    router.refresh();
  }

  // 保留 href 作為無 JS 時的後援（仍可整頁登出）
  return (
    <a href="/logout" onClick={onClick}>
      登出
    </a>
  );
}
