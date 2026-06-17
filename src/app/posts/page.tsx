import { redirect } from "next/navigation";
import PostCard from "@/components/PostCard";
import { getSupabaseServer } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth";
import { buildCards } from "@/lib/posts";
import { isValidSchoolName, schoolNameToCode } from "@/lib/school";
import type { PostRow } from "@/lib/types";

export const dynamic = "force-dynamic";

// 對應 posts.php：依學校（school 名稱）顯示該校貼文
export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ school?: string }>;
}) {
  const { school } = await searchParams;

  const valid = school ? await isValidSchoolName(school) : false;
  if (!valid) {
    redirect("/");
  }

  const code = (await schoolNameToCode(school!)) ?? "";
  const supabase = await getSupabaseServer();
  const [profile, postsRes] = await Promise.all([
    getCurrentProfile(),
    supabase.from("posts").select("*").eq("schoolcode", code.trim()).order("id", { ascending: false }),
  ]);
  const posts = (postsRes.data as PostRow[]) ?? [];
  const cards = await buildCards(posts, profile?.id ?? null);

  return (
    <>
      <div className="padding">
        <div className="full col-sm-9">
          <div className="row">
            <div className="col-sm-5">
              <section className="home">
                <div id="login" className="text">
                  {!profile && "您尚未登入"}
                  <h4 className="display-4 text-center">{school}</h4>
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <td style={{ border: "none", padding: 0 }}>
                          <link rel="stylesheet" type="text/css" href="/post.css" />
                          <link rel="stylesheet" type="text/css" href="/postttt.css" />
                          {posts.length < 1 && (
                            <div className="display-4 text-center">此學校目前沒有貼文喔!</div>
                          )}
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
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
