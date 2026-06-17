"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { showToast } from "@/lib/toast";

// 顯示由伺服器導向帶來的 ?error= / ?success= 提示。
// 文字經 showToast 內的 HTML 跳脫處理，避免反射型 XSS。
export default function FlashNotice() {
  const params = useSearchParams();
  const error = params.get("error");
  const success = params.get("success");

  useEffect(() => {
    if (error) showToast(error, "warning");
    if (success) showToast(success, "success");
  }, [error, success]);

  return null;
}
