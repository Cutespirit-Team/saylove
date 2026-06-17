import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

// 對應 change-p.php（先用舊密碼重新驗證,再更新密碼;回 JSON）。
export async function POST(req: NextRequest) {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, message: "請先登入" }, { status: 401 });

  const form = await req.formData();
  const op = String(form.get("op") ?? "");
  const np = String(form.get("np") ?? "");
  const c_np = String(form.get("c_np") ?? "");

  if (!op) return NextResponse.json({ ok: false, message: "舊密碼未填" }, { status: 400 });
  if (!np) return NextResponse.json({ ok: false, message: "新密碼未填" }, { status: 400 });
  if (np !== c_np) return NextResponse.json({ ok: false, message: "新密碼和確認新密碼不符" }, { status: 400 });
  if (np.length < 8 || np.length > 16)
    return NextResponse.json({ ok: false, message: "新密碼需介於 8~16 字" }, { status: 400 });

  // 用舊密碼重新驗證
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: op,
  });
  if (signInError) return NextResponse.json({ ok: false, message: "舊密碼錯誤" }, { status: 400 });

  const { error } = await supabase.auth.updateUser({ password: np });
  if (error) return NextResponse.json({ ok: false, message: "變更失敗,請稍後再試" }, { status: 500 });
  return NextResponse.json({ ok: true, message: "密碼已成功變更" });
}
