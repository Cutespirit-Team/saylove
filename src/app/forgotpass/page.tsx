import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import ForgotForm from "@/components/ForgotForm";

export const dynamic = "force-dynamic";

// 對應 forgotpass.php：輸入信箱 → 寄送 Supabase 重設密碼連結
export default async function ForgotPassPage() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return (
    <div className="container">
      <ForgotForm />
    </div>
  );
}
