// 重現原 PHP 的資料清理邏輯，確保入庫資料與原站一致。

// 對應原本散落在各檔的 validate()：trim + stripslashes + htmlspecialchars
export function validate(data: string): string {
  let d = (data ?? "").trim();
  d = stripslashes(d);
  d = htmlspecialchars(d);
  return d;
}

// PHP stripslashes：移除反斜線跳脫
export function stripslashes(str: string): string {
  return str.replace(/\\(.)/g, (_, ch) => (ch === "0" ? "\0" : ch));
}

// PHP htmlspecialchars（預設 ENT_QUOTES 之外 PHP8 預設也轉單引號；原碼為預設，會轉 & < > "）
export function htmlspecialchars(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// PHP htmlentities：此處資料多為中英數字，與 htmlspecialchars 等效處理即可
export function htmlentities(str: string): string {
  return htmlspecialchars(str);
}

// 重現原本「非法字元以 ’（U+2019）取代」的迴圈
export function replaceIllegal(value: string, illegal: string[]): string {
  let v = value;
  for (const ch of illegal) {
    v = v.split(ch).join("’");
  }
  return v;
}

// 各處用到的非法字元集合（與原碼一致）
export const ILLEGAL_FULL = ["=", "#", "!", "｛", "｝", "：", "+", "-", "/", "&", "'", '"', "^", "%", "$", "or"];
export const ILLEGAL_PASS = ["=", "'", '"', "^", "%", "$", "or"];
export const ILLEGAL_SENTENCE = ["#", "｛", "｝", "：", "-", "/", "&", "'", '"', "^", "%", "$", "or"];
export const ILLEGAL_SENTENCE_SEMI = ["#", "｛", "｝", "：", "-", "/", "&", "'", '"', "^", "%", "$", "or", ";"];
export const ILLEGAL_PROFILE = ["=", "#", "!", "｛", "｝", "：", "+", "-", "/", "&", "'", '"', "^", "%", "$", "or"];
export const ILLEGAL_CHANGEP = ["=", "or", "'"];
