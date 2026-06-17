import { NextRequest, NextResponse } from "next/server";
import { getAdminProfile } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { validate, htmlentities } from "@/lib/sanitize";

// 對應 php/update-user.php：管理員更新會員資料（回 JSON）。
// 修改 email / password 需透過 Supabase admin API（service_role）。
export async function POST(req: NextRequest) {
  const admin = await getAdminProfile();
  if (!admin) return NextResponse.json({ ok: false, message: "沒有權限" }, { status: 403 });

  const form = await req.formData();
  const name = htmlentities(validate(String(form.get("name") ?? "")));
  const email = htmlentities(validate(String(form.get("email") ?? "")));
  const password = String(form.get("password") ?? ""); // 留空則不變更
  const id = String(form.get("id") ?? "");

  if (!name) return NextResponse.json({ ok: false, message: "姓名未填" }, { status: 400 });
  if (!email) return NextResponse.json({ ok: false, message: "電子郵件未填" }, { status: 400 });

  const supabaseAdmin = getSupabaseAdmin();
  const authUpdate: { email: string; password?: string } = { email };
  if (password) authUpdate.password = password;
  const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(id, authUpdate);
  if (authError) return NextResponse.json({ ok: false, message: "更新失敗(auth)" }, { status: 500 });

  const { error } = await supabaseAdmin.from("profiles").update({ name, email }).eq("id", id);
  if (error) return NextResponse.json({ ok: false, message: "更新失敗(profile)" }, { status: 500 });
  return NextResponse.json({ ok: true, message: "更新成功" });
}
