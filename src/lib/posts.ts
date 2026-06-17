import { getSupabaseServer } from "@/lib/supabase/server";
import type { MessageRow, PostRow } from "@/lib/types";

export async function getMessagesForPost(postid: number): Promise<MessageRow[]> {
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("message")
    .select("*")
    .eq("postid", postid)
    .order("id", { ascending: false });
  return (data as MessageRow[]) ?? [];
}

export async function userLikedPost(userid: string | null, postid: number): Promise<boolean> {
  if (!userid) return false;
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("likes")
    .select("id")
    .eq("userid", userid)
    .eq("postid", postid);
  return (data?.length ?? 0) === 1;
}

export interface CardData {
  post: PostRow;
  liked: boolean;
  messages: MessageRow[];
}

export async function buildCards(posts: PostRow[], viewerId: string | null): Promise<CardData[]> {
  return Promise.all(
    posts.map(async (post) => ({
      post,
      liked: await userLikedPost(viewerId, post.id),
      messages: await getMessagesForPost(post.id),
    }))
  );
}
