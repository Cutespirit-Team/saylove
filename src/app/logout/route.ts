import { redirectTo } from "@/lib/redirect";
import { getSupabaseServer } from "@/lib/supabase/server";

// 對應 logout.php（透過導覽列 /logout 連結進入）
export async function GET() {
  const supabase = await getSupabaseServer();
  await supabase.auth.signOut();
  return redirectTo("/?success=登出成功!");
}
