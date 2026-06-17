import { Suspense } from "react";
import FlashNotice from "@/components/FlashNotice";
import PostCard from "@/components/PostCard";
import { getSupabaseServer } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth";
import { buildCards } from "@/lib/posts";
import type { PostRow } from "@/lib/types";

export const dynamic = "force-dynamic";

// 對應 index.php：首頁告白牆（全部貼文）+ 右側聊天 iframe
export default async function HomePage() {
  const supabase = await getSupabaseServer();
  const [profile, postsRes] = await Promise.all([
    getCurrentProfile(),
    supabase.from("posts").select("*").order("id", { ascending: false }),
  ]);
  const posts = (postsRes.data as PostRow[]) ?? [];
  const cards = await buildCards(posts, profile?.id ?? null);
  const chatUrl = process.env.CHAT_URL || "https://chat.cutespirit.org/";

  return (
    <>
      <Suspense fallback={null}>
        <FlashNotice />
      </Suspense>
      <div className="padding">
        <div className="full col-sm-9">
          <div className="row">
            <div className="col-sm-5">
              <link rel="stylesheet" type="text/css" href="/post.css" />
              <link rel="stylesheet" type="text/css" href="/postttt.css" />
              {cards.map((c) => (
                <PostCard
                  key={c.post.id}
                  post={c.post}
                  viewer={profile}
                  loggedIn={!!profile}
                  liked={c.liked}
                  messages={c.messages}
                />
              ))}
            </div>
            <div className="col-sm-7">
              <iframe
                src={chatUrl}
                width="45%"
                height={500}
                style={{ border: "none", position: "fixed" }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
