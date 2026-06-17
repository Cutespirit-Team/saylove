import PostCard from "@/components/PostCard";
import { getSupabaseServer } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth";
import { buildCards } from "@/lib/posts";
import type { PostRow } from "@/lib/types";

export const dynamic = "force-dynamic";

// 對應 userpost.php：顯示單篇貼文
export default async function UserPostPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id: idParam } = await searchParams;
  const postid = Number(idParam);
  const supabase = await getSupabaseServer();
  const [profile, postsRes] = await Promise.all([
    getCurrentProfile(),
    Number.isFinite(postid)
      ? supabase.from("posts").select("*").eq("id", postid)
      : Promise.resolve({ data: [] as PostRow[] }),
  ]);
  const posts = (postsRes.data as PostRow[]) ?? [];
  const cards = await buildCards(posts, profile?.id ?? null);

  return (
    <>
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
          </div>
        </div>
      </div>
    </>
  );
}
