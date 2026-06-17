import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

// 對應 forgotpass.php：輸入信箱 → 寄送 Supabase 重設密碼連結
export default async function ForgotPassPage({
  searchParams,
}: {
  searchParams: Promise<{ alert?: string }>;
}) {
  const { alert } = await searchParams;
  const user = await getCurrentUser();
  if (user) redirect("/");

  return (
    <>
      <div className="container">
        <form action="/api/forgot-p" method="post">
          <h4 className="display-4 text-center">忘記密碼</h4>
          <hr />
          <br />
          {alert && (
            <div className="alert alert-danger" role="alert">
              {alert}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">請輸入您的電子郵件</label>
            <input type="email" className="form-control" id="email" name="email" required />
          </div>
          <button type="submit" className="btn btn-primary" name="update">
            下一步
          </button>
        </form>
      </div>
    </>
  );
}
