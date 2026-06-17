import ResetPasswordForm from "@/components/ResetPasswordForm";

export const dynamic = "force-dynamic";

// 對應 forgotpassverify.php：設定新密碼
// 使用者由重設信連結進入（已帶 recovery session），因此只需輸入新密碼。
export default function ForgotPassVerifyPage() {
  return (
    <div className="container">
      <ResetPasswordForm />
    </div>
  );
}
