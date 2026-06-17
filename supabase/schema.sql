-- ============================================================
-- 全國高中告白牆 — Supabase (PostgreSQL) schema + Auth + RLS
-- 使用方式：到 Supabase 專案 → SQL Editor → 貼上整段執行。
-- 認證使用 Supabase Auth（auth.users 由 Supabase 管理）。
-- 自訂欄位放在 public.profiles，以 auth.users.id (uuid) 為主鍵。
-- ============================================================

-- ---------- 個人資料（對應原 users 表的額外欄位）----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text,
  gender text,
  school text,            -- 學校代碼
  identity text,          -- 'admin' 代表管理員
  registertime text
);

-- ---------- 貼文 ----------
create table if not exists public.posts (
  id bigint generated always as identity primary key,
  author_id uuid references auth.users(id) on delete set null,
  sentence text,
  writer text,
  posttime text,
  schoolcode text,
  school text,
  gender text,
  date text,
  likes int default 0
);

-- ---------- 留言 ----------
create table if not exists public.message (
  id bigint generated always as identity primary key,
  author_id uuid references auth.users(id) on delete set null,
  message text,
  name text,
  time text,
  school text,
  postid bigint
);

-- ---------- 按讚紀錄 ----------
create table if not exists public.likes (
  id bigint generated always as identity primary key,
  userid uuid references auth.users(id) on delete cascade,
  likes text,
  name text,
  time text,
  school text,
  postid bigint
);

-- ============================================================
-- 函式 / 觸發器
-- ============================================================

-- 新使用者註冊時自動建立 profile（name 來自 signUp 的 metadata）
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, registertime)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', ''),
    to_char(now(), 'YYYY/MM/DD')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 是否為管理員（供 RLS 政策使用，security definer 以避免遞迴 RLS）
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and identity = 'admin'
  );
$$;

-- 按讚數同步：likes 表異動後重算 posts.likes
create or replace function public.sync_post_likes()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  pid bigint;
begin
  pid := coalesce(new.postid, old.postid);
  update public.posts
     set likes = (select count(*) from public.likes where postid = pid)
   where id = pid;
  return null;
end;
$$;

drop trigger if exists likes_sync_insert on public.likes;
drop trigger if exists likes_sync_delete on public.likes;
create trigger likes_sync_insert after insert on public.likes
  for each row execute function public.sync_post_likes();
create trigger likes_sync_delete after delete on public.likes
  for each row execute function public.sync_post_likes();

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.profiles enable row level security;
alter table public.posts    enable row level security;
alter table public.message  enable row level security;
alter table public.likes    enable row level security;

-- profiles：本人或管理員可讀；本人或管理員可改；新增由觸發器處理
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles
  for update using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

drop policy if exists profiles_delete on public.profiles;
create policy profiles_delete on public.profiles
  for delete using (public.is_admin());

-- posts：公開可讀；登入者可發（author_id 必須是自己）；
-- 本人可刪自己的貼文，管理員可改/刪任何貼文
drop policy if exists posts_select on public.posts;
create policy posts_select on public.posts
  for select using (true);

drop policy if exists posts_insert on public.posts;
create policy posts_insert on public.posts
  for insert with check (auth.uid() = author_id);

drop policy if exists posts_update on public.posts;
create policy posts_update on public.posts
  for update using (auth.uid() = author_id or public.is_admin())
  with check (auth.uid() = author_id or public.is_admin());

drop policy if exists posts_delete on public.posts;
create policy posts_delete on public.posts
  for delete using (auth.uid() = author_id or public.is_admin());

-- message：公開可讀；登入者可留言（author_id 必須是自己）；管理員可刪
drop policy if exists message_select on public.message;
create policy message_select on public.message
  for select using (true);

drop policy if exists message_insert on public.message;
create policy message_insert on public.message
  for insert with check (auth.uid() = author_id);

drop policy if exists message_delete on public.message;
create policy message_delete on public.message
  for delete using (public.is_admin());

-- likes：公開可讀（顯示讚數/是否已讚）；本人可新增/刪除自己的讚
drop policy if exists likes_select on public.likes;
create policy likes_select on public.likes
  for select using (true);

drop policy if exists likes_insert on public.likes;
create policy likes_insert on public.likes
  for insert with check (auth.uid() = userid);

drop policy if exists likes_delete on public.likes;
create policy likes_delete on public.likes
  for delete using (auth.uid() = userid);
