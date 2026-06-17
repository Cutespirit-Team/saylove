"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

// 前端登出：不走整頁 route handler，避免登出後整頁重載（轉圈）。
export default function LogoutLink() {
  const router = useRouter();

  async function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    // client-side 導向 + 重新整理 server 元件（讓導覽列更新為未登入）
    router.replace("/?success=登出成功!");
    router.refresh();
  }

  // 保留 href 作為無 JS 時的後援（仍可整頁登出）
  return (
    <a href="/logout" onClick={onClick}>
      登出
    </a>
  );
}
