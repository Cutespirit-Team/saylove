import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { htmlentities, replaceIllegal, ILLEGAL_SENTENCE_SEMI } from "@/lib/sanitize";

// 修改貼文的「想說的話」。權限交給 RLS：本人可改自己的、管理員可改任何。
export async function POST(req: NextRequest) {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, message: "請先登入" }, { status: 401 });

  const form = await req.formData();
  const id = String(form.get("id") ?? "");
  let sentence = htmlentities(String(form.get("sentence") ?? ""));
  sentence = replaceIllegal(sentence, ILLEGAL_SENTENCE_SEMI);

  if (!id) return NextResponse.json({ ok: false, message: "缺少 id" }, { status: 400 });
  if (!sentence) return NextResponse.json({ ok: false, message: "想說的話未填" }, { status: 400 });

  const { data, error } = await supabase
    .from("posts")
    .update({ sentence })
    .eq("id", Number(id))
    .select("id");
  if (error) return NextResponse.json({ ok: false, message: "修改失敗" }, { status: 500 });
  if (!data || data.length === 0)
    return NextResponse.json({ ok: false, message: "沒有權限修改這篇貼文" }, { status: 403 });
  return NextResponse.json({ ok: true, message: "已修改貼文" });
}
