import { NextRequest, NextResponse } from "next/server";
import { dateYmd, dateYmdHis } from "@/lib/redirect";
import { getSupabaseServer } from "@/lib/supabase/server";
import { htmlentities, replaceIllegal, ILLEGAL_SENTENCE_SEMI } from "@/lib/sanitize";
import type { ProfileRow } from "@/lib/types";

// 對應 php/updateposts.php：發布貼文（回 JSON,前端不重載）。
export async function POST(req: NextRequest) {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, message: "請先登入" }, { status: 401 });

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  const profile = profileData as ProfileRow | null;
  if (!profile) return NextResponse.json({ ok: false, message: "沒有您的資料,請聯繫管理員" }, { status: 400 });

  const form = await req.formData();
  let sentence = htmlentities(String(form.get("sentence") ?? ""));
  const name = htmlentities(String(profile.name ?? ""));
  const gender = htmlentities(String(profile.gender ?? ""));
  const schoolcode = htmlentities(String(profile.school ?? ""));
  const time = dateYmd();
  const school = htmlentities(String(form.get("school") ?? ""));

  sentence = replaceIllegal(sentence, ILLEGAL_SENTENCE_SEMI);

  if (!name) return NextResponse.json({ ok: false, message: "姓名未填,請至個人資料設定" }, { status: 400 });
  if (!sentence) return NextResponse.json({ ok: false, message: "想說的話未填" }, { status: 400 });
  if (!schoolcode || !school)
    return NextResponse.json({ ok: false, message: "請先到個人資料選擇學校" }, { status: 400 });

  // 在 Cloudflare 後面時 cf-connecting-ip 最準確
  const ip =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const ua = req.headers.get("user-agent") || "unknown";
  // 詳情格式：IP|時間|設備(User-Agent)
  const postdetails = `${ip}|${dateYmdHis()}|${ua}`;

  const { error } = await supabase.from("posts").insert({
    author_id: user.id,
    sentence,
    writer: name,
    posttime: time,
    schoolcode,
    school,
    gender,
    date: postdetails,
  });
  if (error) {
    return NextResponse.json({ ok: false, message: "發佈失敗,請調整文章格式後再試" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
