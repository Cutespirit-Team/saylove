// Supabase 回傳的是純物件（非 mysql2 的 RowDataPacket）。

export interface ProfileRow {
  id: string; // uuid
  email: string | null;
  name: string | null;
  gender: string | null;
  school: string | null; // 學校代碼
  identity: string | null;
  registertime: string | null;
}

export interface PostRow {
  id: number;
  author_id: string | null;
  sentence: string | null;
  writer: string | null;
  posttime: string | null;
  schoolcode: string | null;
  school: string | null;
  gender: string | null;
  date: string | null;
  likes: number | null;
}

export interface MessageRow {
  id: number;
  author_id: string | null;
  message: string | null;
  name: string | null;
  time: string | null;
  school: string | null;
  postid: number;
}

export interface LikeRow {
  id: number;
  userid: string | null;
  likes: string | null;
  name: string | null;
  time: string | null;
  school: string | null;
  postid: number;
}
