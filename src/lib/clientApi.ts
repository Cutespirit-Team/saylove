// 前端送出表單到 API route,回傳 JSON 結果。取代原本「整頁 POST → 轉址」。
export interface ApiResult {
  ok: boolean;
  message?: string;
}

export async function postForm(url: string, data: FormData): Promise<ApiResult> {
  try {
    const res = await fetch(url, { method: "POST", body: data });
    const json = (await res.json().catch(() => ({ ok: res.ok }))) as ApiResult;
    return json;
  } catch {
    return { ok: false, message: "網路錯誤,請稍後再試" };
  }
}
