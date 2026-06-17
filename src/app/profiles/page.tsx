import { Suspense } from "react";
import { redirect } from "next/navigation";
import FlashNotice from "@/components/FlashNotice";
import { getCurrentUser, getCurrentProfile } from "@/lib/auth";
import { getSchools } from "@/lib/school";

export const dynamic = "force-dynamic";

// 對應 profiles.php：個人資料 + 變更密碼
export default async function ProfilesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { error, success } = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const profile = await getCurrentProfile();
  const schools = await getSchools();

  const genderDefault = profile?.gender === "男" || profile?.gender === "女" ? profile.gender : "0";
  const schoolDefault = (() => {
    if (!profile?.school) return "0";
    const match = schools.find((s) => s.code === String(profile.school).trim());
    return match ? match.code : "0";
  })();
  const email = profile?.email ?? user.email ?? "";

  return (
    <>
      <section className="home">
        <div id="login" className="text">
          <Suspense fallback={null}>
            <FlashNotice />
          </Suspense>
          {!profile && "沒有您的資料，請聯繫管理員"}
          <div className="padding">
            <div className="full col-sm-9">
              <div className="row">
                <div className="col-sm-5">
                  <div className="container">
                    <form action="/api/updateprofiles" method="post">
                      <h4 className="pgtitle">個人資料</h4>
                      <hr />
                      <br />
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}
                      <div className="form-group">
                        <label htmlFor="name">姓名</label>
                        <input
                          type="text"
                          className="label_name"
                          id="name"
                          name="name"
                          required
                          defaultValue={profile?.name ?? ""}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">電子郵件</label>
                        <input
                          type="email"
                          className="label_name"
                          id="email"
                          name="email"
                          required
                          defaultValue={email}
                          readOnly
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          性別:
                          <select name="gender" id="gender" required className="selector" defaultValue={genderDefault}>
                            <option value="0">請選擇性別</option>
                            <option value="男">男</option>
                            <option value="女">女</option>
                          </select>
                        </label>
                      </div>

                      <div className="form-group">
                        <label className="label_name">
                          高中:
                          <select name="school" id="school" required className="selector" defaultValue={schoolDefault}>
                            <option value="0">請選擇高中</option>
                            {schools.map((s, i) => (
                              <option key={`${s.code}-${i}`} value={s.code}>
                                {s.name}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <button type="submit" className="btn btn-primary" name="update">
                        更新以上資料
                      </button>
                    </form>
                  </div>

                  <form action="/api/change-p" method="post">
                    <h2 className="sub_title">變更密碼</h2>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <div className="form-group">
                      <label>舊密碼</label>
                      <input type="password" className="label_name" name="op" placeholder="Old Password" />
                    </div>
                    <div className="form-group">
                      <label>新密碼</label>
                      <input type="password" className="label_name" name="np" placeholder="New Password" />
                    </div>
                    <div className="form-group">
                      <label>確認新密碼</label>
                      <input type="password" className="label_name" name="c_np" placeholder="Confirm New Password" />
                    </div>
                    <button type="submit" className="btn btn-primary" name="change-p">
                      變更密碼
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
