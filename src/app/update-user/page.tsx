import { redirect } from "next/navigation";
import { getAdminProfile } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import AdminUserForm from "@/components/AdminUserForm";
import type { ProfileRow } from "@/lib/types";

export const dynamic = "force-dynamic";

// 對應 update-user.php：管理員更改會員資料
// 注意：密碼由 Supabase Auth 管理（雜湊儲存），無法回填；留空表示不變更。
export default async function UpdateUserPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const admin = await getAdminProfile();
  if (!admin) redirect("/");

  const supabase = await getSupabaseServer();
  const { data } = await supabase.from("profiles").select("*").eq("id", id ?? "").maybeSingle();
  const user = data as ProfileRow | null;

  return (
    <div className="padding">
      <div className="full col-sm-9">
        <div className="row">
          <div className="col-sm-5">
            <section className="home">
              <div id="login" className="text">
                <div className="container">
                  <AdminUserForm id={user?.id ?? ""} name={user?.name ?? ""} email={user?.email ?? ""} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
