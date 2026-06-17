import { cache } from "react";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { ProfileRow } from "@/lib/types";

export interface AuthUser {
  id: string;
  email: string | null;
}

// 目前登入的使用者。用 cache() 讓同一次請求中（layout + page）只計算一次，
// 優先用 getClaims（本地驗證 JWT，免一次網路往返）；不支援時退回 getUser。
export const getCurrentUser = cache(async (): Promise<AuthUser | null> => {
  try {
    const supabase = await getSupabaseServer();
    const { data, error } = await supabase.auth.getClaims();
    if (!error && data?.claims?.sub) {
      return {
        id: data.claims.sub as string,
        email: (data.claims.email as string | undefined) ?? null,
      };
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user ? { id: user.id, email: user.email ?? null } : null;
  } catch {
    return null;
  }
});

// 目前登入者的 profile（含 name / gender / school / identity）。同樣 cache 去重。
export const getCurrentProfile = cache(async (): Promise<ProfileRow | null> => {
  const user = await getCurrentUser();
  if (!user) return null;
  try {
    const supabase = await getSupabaseServer();
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
    return (data as ProfileRow) ?? null;
  } catch {
    return null;
  }
});

// 是否為管理員（對應原本各管理頁的 identity=='admin' 檢查）。
export async function getAdminProfile(): Promise<ProfileRow | null> {
  const profile = await getCurrentProfile();
  if (!profile || profile.identity !== "admin") return null;
  return profile;
}
