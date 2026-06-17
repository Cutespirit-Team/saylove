import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { validate } from "@/lib/sanitize";

// 刪除貼文（回 JSON）。權限交給 RLS：本人可刪自己的、管理員可刪任何。
export async function POST(req: NextRequest) {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, message: "請先登入" }, { status: 401 });

  const form = await req.formData();
  const id = validate(String(form.get("id") ?? ""));
  if (!id) return NextResponse.json({ ok: false, message: "缺少 id" }, { status: 400 });

  // RLS 會擋掉沒有權限的刪除（不會報錯,但刪到 0 列）。用 select 確認是否真的刪掉。
  const { data, error } = await supabase.from("posts").delete().eq("id", Number(id)).select("id");
  if (error) return NextResponse.json({ ok: false, message: "刪除失敗" }, { status: 500 });
  if (!data || data.length === 0)
    return NextResponse.json({ ok: false, message: "沒有權限刪除這篇貼文" }, { status: 403 });
  return NextResponse.json({ ok: true, message: "已刪除貼文" });
}
