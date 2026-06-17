import SiteShell from "@/components/SiteShell";

export const dynamic = "force-dynamic";

// 對應 forgotpassverify.php：設定新密碼
// 使用者由重設信連結進入（已帶 recovery session），因此只需輸入新密碼。
export default async function ForgotPassVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { error, success } = await searchParams;

  return (
    <SiteShell>
      <div className="container">
        <form action="/api/forgot-p-verify" method="post">
          <h4 className="display-4 text-center">設定新密碼</h4>
          <hr />
          <br />
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="password">請輸入新密碼</label>
            <input type="password" className="form-control" id="password" name="password" required placeholder="Password" />
          </div>
          <div className="form-group">
            <label htmlFor="re_password">確認新密碼</label>
            <input
              type="password"
              className="form-control"
              id="re_password"
              name="re_password"
              required
              placeholder="Re_password"
            />
          </div>
          <button type="submit" className="btn btn-primary" name="update">
            確認變更
          </button>
        </form>
      </div>
    </SiteShell>
  );
}
