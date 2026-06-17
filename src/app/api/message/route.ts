import { NextRequest, NextResponse } from "next/server";
import { dateYmd } from "@/lib/redirect";
import { getSupabaseServer } from "@/lib/supabase/server";
import { htmlentities } from "@/lib/sanitize";
import type { ProfileRow } from "@/lib/types";

// 對應 php/message.php：新增留言（回 JSON,前端不重載）。
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
  const message = htmlentities(String(form.get("message") ?? ""));
  const name = htmlentities(String(profile.name ?? ""));
  const postid = htmlentities(String(form.get("postid") ?? ""));
  const time = dateYmd();
  const school = htmlentities(String(form.get("school") ?? ""));

  if (!name) return NextResponse.json({ ok: false, message: "姓名未填,請至個人資料設定" }, { status: 400 });
  if (!message) return NextResponse.json({ ok: false, message: "想說的話未填" }, { status: 400 });
  if (!postid || !school) return NextResponse.json({ ok: false, message: "資料錯誤,請重新整理再試" }, { status: 400 });

  const { error } = await supabase.from("message").insert({
    author_id: user.id,
    message,
    name,
    time,
    school,
    postid: Number(postid),
  });
  if (error) {
    return NextResponse.json({ ok: false, message: "發生錯誤,請稍後再試" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
