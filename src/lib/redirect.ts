import { NextResponse } from "next/server";
import { headers } from "next/headers";

// 對應 PHP header("Location: ...")。POST 後導向用 303，瀏覽器會改用 GET。
// 以實際請求的 Host 組出絕對網址（部署在任何網域/埠都正確），SITE_URL 作為後援。
export async function redirectTo(path: string): Promise<NextResponse> {
  if (path.startsWith("http")) {
    return NextResponse.redirect(path, { status: 303 });
  }
  let origin = process.env.SITE_URL || "http://localhost:3000";
  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") || h.get("host");
    if (host) {
      const proto = h.get("x-forwarded-proto") || "http";
      origin = `${proto}://${host}`;
    }
  } catch {
    /* 無請求脈絡時用 SITE_URL */
  }
  return NextResponse.redirect(new URL(path, origin).toString(), { status: 303 });
}

// 今天日期，格式 Y/m/d（對應 PHP date("Y/m/d")）
export function dateYmd(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
}

// 格式 Y/m/d G:i:s（對應 PHP date("Y/m/d G:i:s")，G 為 24 小時不補零）
export function dateYmdHis(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = d.getHours();
  const min = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return `${y}/${m}/${day} ${h}:${min}:${s}`;
}
