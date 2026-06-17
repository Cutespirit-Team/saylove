import toast from "react-hot-toast";

// 統一的 toast 介面（改用 react-hot-toast，文字以 React children 渲染，天然免 XSS）。
export function showToast(text: string, type: "warning" | "success") {
  if (type === "success") {
    toast.success(text);
  } else {
    toast.error(text);
  }
}
