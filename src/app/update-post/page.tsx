import { redirect } from "next/navigation";
import { getAdminProfile } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { PostRow } from "@/lib/types";

export const dynamic = "force-dynamic";

// 對應 update-post.php：管理員更改貼文
export default async function UpdatePostPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; error?: string }>;
}) {
  const { id, error } = await searchParams;
  const admin = await getAdminProfile();
  if (!admin) redirect("/");

  const supabase = await getSupabaseServer();
  const { data } = await supabase.from("posts").select("*").eq("id", Number(id)).maybeSingle();
  const post = data as PostRow | null;

  return (
    <>
      <section className="home">
        <div id="login" className="text">
          <div className="container">
            <form action="/api/update-post" method="post">
              <h4 className="display-4 text-center">更改貼文</h4>
              <hr />
              <br />
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="writer">姓名</label>
                <input type="text" className="form-control" id="writer" name="writer" defaultValue={post?.writer ?? ""} />
              </div>
              <div className="form-group">
                <label htmlFor="sentence">貼文</label>
                <input type="text" className="form-control" id="sentence" name="sentence" defaultValue={post?.sentence ?? ""} />
              </div>
              <div className="form-group">
                <label htmlFor="school">學校</label>
                <input type="text" className="form-control" id="school" name="school" defaultValue={post?.school ?? ""} />
              </div>
              <div className="form-group">
                <label htmlFor="posttime">時間</label>
                <input type="text" className="form-control" id="posttime" name="posttime" defaultValue={post?.posttime ?? ""} />
                <input type="text" name="id" defaultValue={post?.id ?? ""} hidden />
                <button type="submit" className="btn btn-primary" name="update">
                  更新
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
