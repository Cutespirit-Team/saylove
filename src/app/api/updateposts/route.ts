import { NextRequest } from "next/server";
import { redirectTo, dateYmd, dateYmdHis } from "@/lib/redirect";
import { getSupabaseServer } from "@/lib/supabase/server";
import { htmlentities, replaceIllegal, ILLEGAL_SENTENCE_SEMI } from "@/lib/sanitize";
import type { ProfileRow } from "@/lib/types";

// 對應 php/updateposts.php：發布貼文
export async function POST(req: NextRequest) {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response("沒有您的資料，請聯繫管理員");

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  const profile = profileData as ProfileRow | null;
  if (!profile) return new Response("沒有您的資料，請聯繫管理員");

  const form = await req.formData();
  let sentence = htmlentities(String(form.get("sentence") ?? ""));
  const name = htmlentities(String(profile.name ?? ""));
  const gender = htmlentities(String(profile.gender ?? ""));
  const schoolcode = htmlentities(String(profile.school ?? ""));
  const time = dateYmd();
  const school = htmlentities(String(form.get("school") ?? ""));

  sentence = replaceIllegal(sentence, ILLEGAL_SENTENCE_SEMI);

  if (!name) return redirectTo("/upload_posts?error=姓名未填，請至個人資料頁面設定");
  if (!sentence) return redirectTo("/upload_posts?error=想說的話未填");
  if (!schoolcode) return redirectTo("/upload_posts?error=錯誤!，未知的學校，請至個人中心重新選取學校或請聯繫管理員");
  if (!school) return redirectTo("/upload_posts?error=錯誤!，未知的學校，，請至個人中心重新選取學校請聯繫管理員");

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const postdetails = `${ip}|${dateYmdHis()}|`;

  const { error } = await supabase.from("posts").insert({
    author_id: user.id,
    sentence,
    writer: name,
    posttime: time,
    schoolcode,
    school,
    gender,
    date: postdetails,
  });
  if (error) {
    return redirectTo(`/upload_posts?error=請調整文章格式，如持續錯誤，請立即連絡我們!&sentence=${sentence}`);
  }
  return redirectTo("/?success=發佈成功");
}
