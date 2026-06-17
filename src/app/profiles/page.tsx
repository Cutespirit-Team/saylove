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
    // .full 提供 padding-top:70px,避開固定的導覽列
    <div className="full">
      <div className="tw-flex tw-justify-center tw-px-4 tw-pb-10">
        <div className="tw-w-full tw-max-w-[480px]">
          {!profile && (
            <div className="tw-mb-4 tw-text-center tw-text-[#c0392b]">沒有您的資料，請聯繫管理員</div>
          )}
          <ProfileForm
            name={profile?.name ?? ""}
            email={email}
            genderDefault={genderDefault}
            schoolDefault={schoolDefault}
            schools={schools}
          />
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
