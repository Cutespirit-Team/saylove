import { redirect } from "next/navigation";
import { getCurrentUser, getCurrentProfile } from "@/lib/auth";
import { schoolCodeToName } from "@/lib/school";
import PostForm from "@/components/PostForm";

export const dynamic = "force-dynamic";

// 對應 upload_posts.php：新增貼文
export default async function UploadPostsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const profile = await getCurrentProfile();
  const pageschool = profile?.school ? (await schoolCodeToName(String(profile.school))) ?? "" : "";

  if (!pageschool) {
    redirect("/profiles");
  }

  return (
    <div className="padding">
      <div className="full col-sm-9">
        <div className="row">
          <div className="col-sm-5">
            <section className="home">
              <div id="login" className="text">
                {profile && `${profile.name}，網站尚在建置中!`}
                <div className="container">
                  <PostForm name={profile?.name ?? ""} school={pageschool} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
