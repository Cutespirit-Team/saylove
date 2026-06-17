import { redirect } from "next/navigation";
import { getCurrentUser, getCurrentProfile } from "@/lib/auth";
import { getSchools } from "@/lib/school";
import ProfileForm from "@/components/ProfileForm";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export const dynamic = "force-dynamic";

// 對應 profiles.php：個人資料 + 變更密碼
export default async function ProfilesPage() {
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
    <section className="home">
      <div id="login" className="text">
        {!profile && "沒有您的資料，請聯繫管理員"}
        <div className="padding">
          <div className="full col-sm-9">
            <div className="row">
              <div className="col-sm-5">
                <div className="container">
                  <ProfileForm
                    name={profile?.name ?? ""}
                    email={email}
                    genderDefault={genderDefault}
                    schoolDefault={schoolDefault}
                    schools={schools}
                  />
                </div>
                <ChangePasswordForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
