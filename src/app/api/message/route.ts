import { NextRequest } from "next/server";
import { redirectTo, dateYmd } from "@/lib/redirect";
import { getSupabaseServer } from "@/lib/supabase/server";
import { htmlentities } from "@/lib/sanitize";
import type { ProfileRow } from "@/lib/types";

// 對應 php/message.php：新增留言
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
  const message = htmlentities(String(form.get("message") ?? ""));
  const name = htmlentities(String(profile.name ?? ""));
  const postid = htmlentities(String(form.get("postid") ?? ""));
  const time = dateYmd();
  const school = htmlentities(String(form.get("school") ?? ""));

  if (!name) return redirectTo("/profiles?error=姓名未填，請至個人資料頁面設定");
  if (!message) return redirectTo("/?error=想說的話未填");
  if (!postid) return redirectTo("/profiles?error=錯誤!，未知的學校，請至個人中心重新選取學校或請聯繫管理員");
  if (!school) return redirectTo("/profiles?error=錯誤!，未知的學校，，請至個人中心重新選取學校請聯繫管理員");

  const { error } = await supabase.from("message").insert({
    author_id: user.id,
    message,
    name,
    time,
    school,
    postid: Number(postid),
  });
  if (error) {
    return redirectTo("/?error=未知的錯誤，請調整格式，如持續錯誤，請立即連絡我們!");
  }
  return redirectTo(`/userpost?id=${postid}`);
}
