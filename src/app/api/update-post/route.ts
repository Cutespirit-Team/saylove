import { NextRequest, NextResponse } from "next/server";
import { getAdminProfile } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import { validate } from "@/lib/sanitize";

// 對應 php/update-post.php：管理員更新貼文（回 JSON）。
export async function POST(req: NextRequest) {
  const admin = await getAdminProfile();
  if (!admin) return NextResponse.json({ ok: false, message: "沒有權限" }, { status: 403 });

  const form = await req.formData();
  const writer = validate(String(form.get("writer") ?? ""));
  const sentence = validate(String(form.get("sentence") ?? ""));
  const school = validate(String(form.get("school") ?? ""));
  const posttime = validate(String(form.get("posttime") ?? ""));
  const id = validate(String(form.get("id") ?? ""));

  if (!writer) return NextResponse.json({ ok: false, message: "姓名未填" }, { status: 400 });
  if (!sentence) return NextResponse.json({ ok: false, message: "貼文內容未填" }, { status: 400 });
  if (!school) return NextResponse.json({ ok: false, message: "學校未填" }, { status: 400 });

  const supabase = await getSupabaseServer();
  const { error } = await supabase
    .from("posts")
    .update({ writer, sentence, school, posttime })
    .eq("id", Number(id));
  if (error) return NextResponse.json({ ok: false, message: "更新失敗" }, { status: 500 });
  return NextResponse.json({ ok: true, message: "更新成功" });
}
