import { Suspense } from "react";
import { redirect } from "next/navigation";
import FlashNotice from "@/components/FlashNotice";
import { getCurrentUser, getCurrentProfile } from "@/lib/auth";
import { schoolCodeToName } from "@/lib/school";

export const dynamic = "force-dynamic";

// 對應 upload_posts.php：新增貼文
export default async function UploadPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ alert?: string; sentence?: string }>;
}) {
  const { alert, sentence } = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const profile = await getCurrentProfile();
  const pageschool = profile?.school ? (await schoolCodeToName(String(profile.school))) ?? "" : "";

  if (!pageschool) {
    redirect("/profiles?error=請先選擇學校");
  }

  return (
    <>
      <div className="padding">
        <div className="full col-sm-9">
          <div className="row">
            <div className="col-sm-5">
              <section className="home">
                <div id="login" className="text">
                  <Suspense fallback={null}>
                    <FlashNotice />
                  </Suspense>
                  {!profile && "您尚未登入優"}
                  {profile && `${profile.name}，網站尚在建置中!`}
                  <div className="container">
                    <form action="/api/updateposts" method="post">
                      <h4 className="pgtitle">新增貼文</h4>
                      <hr />
                      <br />
                      {alert && (
                        <div className="alert alert-danger" role="alert">
                          {alert}
                        </div>
                      )}
                      <div className="form-group">
                        <label htmlFor="name">您的姓名</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          required
                          defaultValue={profile?.name ?? ""}
                          readOnly
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="school">發布學校</label>
                        <input
                          type="text"
                          className="form-control"
                          id="school"
                          name="school"
                          required
                          defaultValue={pageschool}
                          readOnly
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="sentence">想說的話</label>
                        <input
                          type="text"
                          className="form-control"
                          id="sentence"
                          name="sentence"
                          defaultValue={sentence ?? ""}
                          required
                        />
                      </div>

                      <input type="hidden" id="school" name="school" defaultValue={pageschool} />

                      <button type="submit" className="btn btn-primary" name="update">
                        發布
                      </button>
                    </form>
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
