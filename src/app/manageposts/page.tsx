import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminProfile } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import DeleteButton from "@/components/DeleteButton";
import type { PostRow } from "@/lib/types";

export const dynamic = "force-dynamic";

// 對應 manageposts.php：貼文管理列表
export default async function ManagePostsPage() {
  const admin = await getAdminProfile();
  if (!admin) redirect("/");

  const supabase = await getSupabaseServer();
  const { data } = await supabase.from("posts").select("*").order("id", { ascending: false });
  const posts = (data as PostRow[]) ?? [];

  return (
    <>
      <div className="padding">
        <div className="full col-sm-9">
          <div className="row">
            <section className="home">
              <div id="login" className="text">
                <div className="box weight auto">
                  <h4 className="pgtitle center">貼文管理</h4>
                  <br />
                  {posts.length > 0 && (
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th className="text1234" scope="col">#</th>
                          <th className="text1234" scope="col">姓名</th>
                          <th className="text1234" scope="col">貼文</th>
                          <th className="text1234" scope="col">學校</th>
                          <th className="text1234" scope="col">詳情</th>
                          <th className="text1234" scope="col">動作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.map((row, i) => (
                          <tr key={row.id}>
                            <th className="text1234" scope="row">{i + 1}</th>
                            <td className="text1234">{row.writer}</td>
                            <td className="text1234">{row.sentence}</td>
                            <td className="text1234">{row.school}</td>
                            <td className="text1234">{row.date}</td>
                            <td className="text1234">
                              <Link href={`/update-post?id=${row.id}`} className="btn btn-success">
                                更新資料
                              </Link>{" "}
                              <DeleteButton url="/api/delete-post" id={row.id} confirmText="確定刪除這篇貼文?" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  <div className="link-right"></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
