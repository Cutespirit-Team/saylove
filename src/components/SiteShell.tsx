import SiteChrome from "@/components/SiteChrome";
import { getCurrentProfile } from "@/lib/auth";
import { getSchoolNames } from "@/lib/school";

// 對應 header.php + footer.php：抓登入狀態與學校清單,交給 client 的 SiteChrome 渲染外框。
export default async function SiteShell({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();
  const loggedIn = !!profile;
  const isAdmin = !!profile && profile.identity === "admin";
  const schoolNames = await getSchoolNames();

  return (
    <SiteChrome loggedIn={loggedIn} isAdmin={isAdmin} schoolNames={schoolNames}>
      {children}
    </SiteChrome>
  );
}
