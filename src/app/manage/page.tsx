import { redirect } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import { getAdminProfile } from "@/lib/auth";

export const dynamic = "force-dynamic";

// 對應 manage.php：管理中心入口
export default async function ManagePage() {
  const admin = await getAdminProfile();
  if (!admin) redirect("/");

  return (
    <SiteShell>
      <div className="padding">
        <div className="full col-sm-9">
          <div className="row">
            <div className="col-sm-5">
              <section className="home">
                <div id="login" className="text">
                  <a href="/manageuser" className="btn btn-info">
                    會員管理
                  </a>
                  <a href="/manageposts" className="btn btn-info">
                    貼文管理
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
