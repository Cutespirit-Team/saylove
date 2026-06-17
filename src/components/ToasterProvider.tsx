"use client";

import { Toaster } from "react-hot-toast";

// 全站 toast 容器：固定在右上角。
export default function ToasterProvider() {
  return <Toaster position="top-right" toastOptions={{ duration: 3000 }} />;
}
