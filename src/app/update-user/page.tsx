import { redirect } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import { getAdminProfile } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { ProfileRow } from "@/lib/types";

export const dynamic = "force-dynamic";

// 對應 update-user.php：管理員更改會員資料
// 注意：密碼由 Supabase Auth 管理（雜湊儲存），無法回填；留空表示不變更。
export default async function UpdateUserPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; error?: string }>;
}) {
  const { id, error } = await searchParams;
  const admin = await getAdminProfile();
  if (!admin) redirect("/");

  const supabase = await getSupabaseServer();
  const { data } = await supabase.from("profiles").select("*").eq("id", id ?? "").maybeSingle();
  const user = data as ProfileRow | null;

  return (
    <SiteShell>
      <div className="padding">
        <div className="full col-sm-9">
          <div className="row">
            <div className="col-sm-5">
              <section className="home">
                <div id="login" className="text">
                  <div className="container">
                    <form action="/api/update-user" method="post">
                      <h4 className="display-4 text-center">更改資料</h4>
                      <hr />
                      <br />
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}
                      <div className="form-group">
                        <label htmlFor="name">姓名</label>
                        <input type="text" className="form-control" id="name" name="name" defaultValue={user?.name ?? ""} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">電子郵件</label>
                        <input type="email" className="form-control" id="email" name="email" defaultValue={user?.email ?? ""} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">密碼（留空則不變更）</label>
                        <input type="text" className="form-control" id="password" name="password" defaultValue="" placeholder="留空則不變更" />
                      </div>
                      <input type="text" name="id" defaultValue={user?.id ?? ""} hidden />
                      <button type="submit" className="btn btn-primary" name="update">
                        更新
                      </button>{" "}
                      <a href="/manageuser" className="link-primary">
                        會員列表
                      </a>
                    </form>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
