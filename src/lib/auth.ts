import { getSupabaseServer } from "@/lib/supabase/server";
import type { ProfileRow } from "@/lib/types";

// 目前登入的 auth 使用者（取代原本的 iron-session）。未登入或無法連線時回 null。
export async function getCurrentUser() {
  try {
    const supabase = await getSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

// 目前登入者的 profile（含 name / gender / school / identity）。
export async function getCurrentProfile(): Promise<ProfileRow | null> {
  try {
    const supabase = await getSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
    return (data as ProfileRow) ?? null;
  } catch {
    return null;
  }
}

// 是否為管理員（對應原本各管理頁的 identity=='admin' 檢查）。
export async function getAdminProfile(): Promise<ProfileRow | null> {
  const profile = await getCurrentProfile();
  if (!profile || profile.identity !== "admin") return null;
  return profile;
}
