import { NextRequest } from "next/server";
import { redirectTo } from "@/lib/redirect";
import { getSupabaseServer } from "@/lib/supabase/server";
import { validate, htmlentities, replaceIllegal, ILLEGAL_PROFILE } from "@/lib/sanitize";

// 對應 php/updateprofiles.php（POST update 分支）：更新個人資料
export async function POST(req: NextRequest) {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirectTo("/");

  const form = await req.formData();
  if (form.get("update") === null) {
    return redirectTo("/");
  }

  let name = htmlentities(validate(String(form.get("name") ?? "")));
  let gender = htmlentities(validate(String(form.get("gender") ?? "")));
  let school = htmlentities(validate(String(form.get("school") ?? "")));

  name = replaceIllegal(name, ILLEGAL_PROFILE);
  gender = replaceIllegal(gender, ILLEGAL_PROFILE);
  school = replaceIllegal(school, ILLEGAL_PROFILE);

  if (gender !== "男" && gender !== "女") {
    return redirectTo("/profiles?error=後台驗證錯誤");
  }
  if (!name) return redirectTo("/profiles?error=姓名未填");
  if (!gender) return redirectTo("/profiles?error=性別未填");
  if (!school || school === "0") return redirectTo("/profiles?error=學校未填");

  // RLS 保證只能改自己的 profile
  const { error } = await supabase
    .from("profiles")
    .update({ name, gender, school })
    .eq("id", user.id);
  if (error) {
    return redirectTo("/profiles?error=未知的錯誤");
  }
  return redirectTo("/profiles?success=更新成功");
}
