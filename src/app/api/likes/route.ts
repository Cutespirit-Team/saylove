import { NextRequest } from "next/server";
import { redirectTo, dateYmd } from "@/lib/redirect";
import { getSupabaseServer } from "@/lib/supabase/server";
import { htmlentities } from "@/lib/sanitize";
import type { ProfileRow, LikeRow } from "@/lib/types";

// 對應 php/likes.php：按讚 / 取消按讚（posts.likes 由資料庫觸發器自動同步）
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
  const messagelikes = htmlentities(String(form.get("messagelikes") ?? ""));
  const name = htmlentities(String(profile.name ?? ""));
  const postid = htmlentities(String(form.get("postid") ?? ""));
  const time = dateYmd();
  const school = htmlentities(String(form.get("school") ?? ""));

  if (!name) return redirectTo("/upload_posts?alert=姓名未填，請至個人資料頁面設定");
  if (!messagelikes) return redirectTo("/upload_posts?alert=想說的話未填");
  if (!postid) return redirectTo("/upload_posts?alert=錯誤!，未知的學校，請至個人中心重新選取學校或請聯繫管理員");
  if (!school) return redirectTo("/upload_posts?alert=錯誤!，未知的學校，，請至個人中心重新選取學校請聯繫管理員");

  const pid = Number(postid);
  const { data: have } = await supabase
    .from("likes")
    .select("id")
    .eq("userid", user.id)
    .eq("postid", pid);

  if ((have as LikeRow[] | null)?.length === 1) {
    await supabase.from("likes").delete().eq("userid", user.id).eq("postid", pid);
  } else {
    await supabase.from("likes").insert({
      likes: messagelikes,
      name,
      time,
      school,
      postid: pid,
      userid: user.id,
    });
  }

  return redirectTo(`/userpost?id=${postid}`);
}
