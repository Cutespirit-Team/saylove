import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// 診斷端點：量測 Vercel 函式所在區域，以及對 Supabase 各操作的往返時間（毫秒）。
// 部署後開 /api/_diag，把結果貼回來即可判斷瓶頸。用完可刪除此檔。
export async function GET() {
  const t = (start: number) => Math.round(performance.now() - start);
  const supabase = await getSupabaseServer();

  let claimsMs = -1;
  let getUserMs = -1;
  let selectMs = -1;
  let profileMs = -1;
  let claimsLocal: boolean | string = "unknown";

  try {
    let s = performance.now();
    const claims = await supabase.auth.getClaims();
    claimsMs = t(s);
    claimsLocal = !claims.error && !!claims.data?.claims ? "ok" : `err:${claims.error?.message ?? "none"}`;

    s = performance.now();
    await supabase.auth.getUser();
    getUserMs = t(s);

    s = performance.now();
    await supabase.from("posts").select("id").limit(1);
    selectMs = t(s);

    s = performance.now();
    await supabase.from("profiles").select("id").limit(1);
    profileMs = t(s);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }

  return NextResponse.json(
    {
      vercelRegion: process.env.VERCEL_REGION ?? "local",
      note: "ms = 對 Supabase 的往返時間",
      getClaimsMs: claimsMs,
      getClaims: claimsLocal,
      getUserMs,
      selectPostsMs: selectMs,
      selectProfileMs: profileMs,
    },
    { headers: { "cache-control": "no-store" } }
  );
}
