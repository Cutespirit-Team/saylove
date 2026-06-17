import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { validate, htmlentities, replaceIllegal, ILLEGAL_PROFILE } from "@/lib/sanitize";

// 對應 php/updateprofiles.php：更新個人資料（回 JSON）。
export async function POST(req: NextRequest) {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, message: "請先登入" }, { status: 401 });

  const form = await req.formData();

  let name = htmlentities(validate(String(form.get("name") ?? "")));
  let gender = htmlentities(validate(String(form.get("gender") ?? "")));
  let school = htmlentities(validate(String(form.get("school") ?? "")));

  name = replaceIllegal(name, ILLEGAL_PROFILE);
  gender = replaceIllegal(gender, ILLEGAL_PROFILE);
  school = replaceIllegal(school, ILLEGAL_PROFILE);

  if (gender !== "男" && gender !== "女")
    return NextResponse.json({ ok: false, message: "性別未填" }, { status: 400 });
  if (!name) return NextResponse.json({ ok: false, message: "姓名未填" }, { status: 400 });
  if (!school || school === "0")
    return NextResponse.json({ ok: false, message: "學校未填" }, { status: 400 });

  // RLS 保證只能改自己的 profile
  const { error } = await supabase.from("profiles").update({ name, gender, school }).eq("id", user.id);
  if (error) return NextResponse.json({ ok: false, message: "更新失敗,請稍後再試" }, { status: 500 });
  return NextResponse.json({ ok: true, message: "更新成功" });
}
