import { NextRequest, NextResponse } from "next/server";
import { getAdminProfile } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

// 對應 php/delete-user.php：管理員刪除會員（回 JSON）。
// 刪除 auth.users 會連動刪除 profile / likes（FK on delete cascade）。
export async function POST(req: NextRequest) {
  const admin = await getAdminProfile();
  if (!admin) return NextResponse.json({ ok: false, message: "沒有權限" }, { status: 403 });

  const form = await req.formData();
  const id = String(form.get("id") ?? "");
  if (!id) return NextResponse.json({ ok: false, message: "缺少 id" }, { status: 400 });

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
  if (error) return NextResponse.json({ ok: false, message: "刪除失敗" }, { status: 500 });
  return NextResponse.json({ ok: true, message: "成功刪除" });
}
