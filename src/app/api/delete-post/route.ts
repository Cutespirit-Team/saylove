import { NextRequest, NextResponse } from "next/server";
import { getAdminProfile } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import { validate } from "@/lib/sanitize";

// 對應 php/delete-post.php：管理員刪除貼文（回 JSON）。
export async function POST(req: NextRequest) {
  const admin = await getAdminProfile();
  if (!admin) return NextResponse.json({ ok: false, message: "沒有權限" }, { status: 403 });

  const form = await req.formData();
  const id = validate(String(form.get("id") ?? ""));
  if (!id) return NextResponse.json({ ok: false, message: "缺少 id" }, { status: 400 });

  const supabase = await getSupabaseServer();
  const { error } = await supabase.from("posts").delete().eq("id", Number(id));
  if (error) return NextResponse.json({ ok: false, message: "刪除失敗" }, { status: 500 });
  return NextResponse.json({ ok: true, message: "成功刪除" });
}
