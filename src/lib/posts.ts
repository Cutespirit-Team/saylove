import { getSupabaseServer } from "@/lib/supabase/server";
import type { MessageRow, PostRow } from "@/lib/types";

export interface CardData {
  post: PostRow;
  liked: boolean;
  messages: MessageRow[];
}

// 一次把整批貼文的留言與「我按過的讚」抓回來（2 個平行查詢），
// 取代原本每篇 2 次查詢的 N+1 寫法，大幅降低網路往返。
export async function buildCards(posts: PostRow[], viewerId: string | null): Promise<CardData[]> {
  if (posts.length === 0) return [];
  const ids = posts.map((p) => p.id);
  const supabase = await getSupabaseServer();

  const [msgRes, likeRes] = await Promise.all([
    supabase.from("message").select("*").in("postid", ids).order("id", { ascending: false }),
    viewerId
      ? supabase.from("likes").select("postid").eq("userid", viewerId).in("postid", ids)
      : Promise.resolve({ data: [] as { postid: number }[] }),
  ]);

  // 依 postid 分組（已是 id DESC，分組後每篇仍維持 DESC）
  const messagesByPost = new Map<number, MessageRow[]>();
  for (const m of (msgRes.data as MessageRow[] | null) ?? []) {
    const arr = messagesByPost.get(m.postid) ?? [];
    arr.push(m);
    messagesByPost.set(m.postid, arr);
  }

  const likedSet = new Set<number>(
    ((likeRes.data as { postid: number }[] | null) ?? []).map((l) => l.postid)
  );

  return posts.map((post) => ({
    post,
    liked: likedSet.has(post.id),
    messages: messagesByPost.get(post.id) ?? [],
  }));
}
