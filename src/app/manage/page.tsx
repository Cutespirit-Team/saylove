import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminProfile } from "@/lib/auth";

export const dynamic = "force-dynamic";

// 對應 manage.php：管理中心入口
export default async function ManagePage() {
  const admin = await getAdminProfile();
  if (!admin) redirect("/");

  return (
    <>
      <div className="padding">
        <div className="full col-sm-9">
          <div className="row">
            <div className="col-sm-5">
              <section className="home">
                <div id="login" className="text">
                  <Link href="/manageuser" className="btn btn-info">
                    會員管理
                  </Link>
                  <Link href="/manageposts" className="btn btn-info">
                    貼文管理
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
