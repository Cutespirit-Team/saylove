import { createClient } from "@supabase/supabase-js";

// service_role client：會繞過 RLS，僅供伺服器端的管理員操作使用
// （修改/刪除其他使用者的 auth 帳號等需要 admin API 的動作）。
// 絕對不可暴露到瀏覽器。
export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    }
  );
}
