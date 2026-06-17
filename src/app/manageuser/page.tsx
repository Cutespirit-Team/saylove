import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminProfile } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import DeleteButton from "@/components/DeleteButton";
import type { ProfileRow } from "@/lib/types";

export const dynamic = "force-dynamic";

// 對應 manageuser.php：會員列表
export default async function ManageUserPage() {
  const admin = await getAdminProfile();
  if (!admin) redirect("/");

  const supabase = await getSupabaseServer();
  const { data } = await supabase.from("profiles").select("*").order("registertime", { ascending: false });
  const users = (data as ProfileRow[]) ?? [];

  return (
    <>
      <div className="padding">
        <div className="full col-sm-9">
          <div className="row">
            <div className="col-sm-5">
              <section className="home">
                <div id="login" className="text">
                  <div className="container">
                    <div className="box">
                      <h4 className="display-4 text-center">會員列表</h4>
                      <br />
                      {users.length > 0 && (
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">姓名</th>
                              <th scope="col">電子郵件</th>
                              <th scope="col">動作</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((row, i) => (
                              <tr key={row.id}>
                                <th scope="row">{i + 1}</th>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>
                                  <Link href={`/update-user?id=${row.id}`} className="btn btn-success">
                                    更新資料
                                  </Link>{" "}
                                  <DeleteButton url="/api/delete-user" id={row.id} confirmText="確定刪除這位會員?" />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      <div className="link-right"></div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
