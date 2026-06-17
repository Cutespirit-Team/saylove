import { redirect } from "next/navigation";
import { getAdminProfile } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import AdminPostForm from "@/components/AdminPostForm";
import type { PostRow } from "@/lib/types";

export const dynamic = "force-dynamic";

// 對應 update-post.php：管理員更改貼文
export default async function UpdatePostPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const admin = await getAdminProfile();
  if (!admin) redirect("/");

  const supabase = await getSupabaseServer();
  const { data } = await supabase.from("posts").select("*").eq("id", Number(id)).maybeSingle();
  const post = data as PostRow | null;

  return (
    <section className="home">
      <div id="login" className="text">
        <div className="container">
          <AdminPostForm
            id={post?.id ?? ""}
            writer={post?.writer ?? ""}
            sentence={post?.sentence ?? ""}
            school={post?.school ?? ""}
            posttime={post?.posttime ?? ""}
          />
        </div>
      </div>
    </section>
  );
}
