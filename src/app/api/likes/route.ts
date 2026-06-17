import { NextRequest, NextResponse } from "next/server";
import { dateYmd } from "@/lib/redirect";
import { getSupabaseServer } from "@/lib/supabase/server";
import { htmlentities } from "@/lib/sanitize";
import type { ProfileRow, LikeRow } from "@/lib/types";

// 對應 php/likes.php：按讚 / 取消按讚（回 JSON,前端不重載；posts.likes 由觸發器同步）。
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
  const messagelikes = htmlentities(String(form.get("messagelikes") ?? ""));
  const name = htmlentities(String(profile.name ?? ""));
  const postid = htmlentities(String(form.get("postid") ?? ""));
  const time = dateYmd();
  const school = htmlentities(String(form.get("school") ?? ""));

  if (!name) return NextResponse.json({ ok: false, message: "姓名未填,請至個人資料設定" }, { status: 400 });
  if (!postid || !school) return NextResponse.json({ ok: false, message: "資料錯誤,請重新整理再試" }, { status: 400 });

  const pid = Number(postid);
  const { data: have } = await supabase
    .from("likes")
    .select("id")
    .eq("userid", user.id)
    .eq("postid", pid);

  if ((have as LikeRow[] | null)?.length === 1) {
    await supabase.from("likes").delete().eq("userid", user.id).eq("postid", pid);
    return NextResponse.json({ ok: true, liked: false });
  }
  await supabase.from("likes").insert({
    likes: messagelikes || "YES",
    name,
    time,
    school,
    postid: pid,
    userid: user.id,
  });
  return NextResponse.json({ ok: true, liked: true });
}
