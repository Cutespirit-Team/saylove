# 全國高中告白牆 — Next.js + Supabase 版

原本的 PHP 網站改寫為 **Next.js 15 (App Router) + TypeScript + Tailwind CSS**,
資料庫與認證改用 **Supabase（PostgreSQL + Supabase Auth + Row Level Security）**。
視覺與頁面結構與原站一致;認證/資料層依 Supabase 慣例重做。

## 樣式（完全保留）
原本的 CSS / JS / 字型 / 圖片原封不動放在 `public/`
(`bootstrap.css`、`style.css`、`post.css`、`postttt.css`、`login.css`、`search.css`、`notice/`、`fonts/`、`img/`、`school/school.csv`)。
頁面以相同 HTML 結構（JSX）+ 相同 class 呈現,外觀與原站相同。

> Tailwind 已設定好可用,但**關閉 preflight 並加 `tw-` 前綴**,避免破壞原站樣式。新樣式請用 `tw-` 開頭的 class。

## 頁面 / API 對應
頁面對應與原站相同(`/`、`/posts`、`/userpost`、`/login`、`/register`、`/profiles`、
`/upload_posts`、`/forgotpass`、`/forgotpassverify`、`/manage`、`/manageposts`、`/manageuser`、
`/update-post`、`/update-user`、`/instructions/*`、`/logout`)。
後端處理在 `src/app/api/*`,表單仍以原生 POST → 303 導回頁面(帶 `?error=`/`?success=`)。

## 資料模型（Supabase / PostgreSQL）
見 `supabase/schema.sql`(到 Supabase 專案的 **SQL Editor** 貼上執行)。
- 認證使用 **Supabase Auth**(`auth.users` 由 Supabase 管理,密碼雜湊儲存)。
- 自訂欄位放 `public.profiles`(id=auth.users.id uuid、email、name、gender、school、identity、registertime),
  新使用者由觸發器 `handle_new_user` 自動建立。
- `posts` / `message` / `likes` 對應原四張表;`likes` 異動後由觸發器 `sync_post_likes` 自動同步 `posts.likes`。

### Row Level Security（真正的 RLS,綁 `auth.uid()`）
- **posts / message / likes**:公開可讀(告白牆是公開的)。
- 發貼文 / 留言 / 按讚:**只能以自己的身分新增**(`author_id` / `userid` = `auth.uid()`)。
- 取消讚:只能刪自己的。
- 改 / 刪貼文、刪留言:**僅管理員**(`is_admin()`)。
- **profiles**:本人或管理員可讀 / 可改。

## 與原站的行為差異（因改用 Supabase Auth）
- 登入 / 註冊 / 改密碼改走 Supabase Auth(密碼雜湊,不再明文)。改密碼仍需輸入舊密碼(重新驗證)。
- **忘記密碼**:改為寄送「**重設密碼連結**」到信箱(原本是頁面內輸入 6 位數驗證碼)。
  點信中連結回到 `/forgotpassverify`,只需輸入新密碼。
- 管理員改 / 刪會員的 email / 密碼,透過 Supabase admin API(`service_role`,僅伺服器端)。

## 安裝與設定

需求:Node.js、pnpm、一個 Supabase 專案(免費方案即可)。**不需要 Docker**。

1. 到 [supabase.com](https://supabase.com) 建立專案。
2. **SQL Editor** → 貼上 `supabase/schema.sql` 執行(建表、觸發器、RLS)。
3. **Authentication → Providers → Email**:若要「註冊後可直接登入」(貼近原站流程),
   關閉 *Confirm email*;否則使用者需先點信箱確認連結。
4. **Authentication → URL Configuration → Redirect URLs**:加入
   `http://localhost:3000/forgotpassverify`(及正式網域對應網址),供重設密碼連結導回。
5. 複製 `.env.local` 並填入 **Settings → API** 的三個值:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...      # 僅伺服器端使用,勿外洩
   SITE_URL=http://localhost:3000
   CHAT_URL=https://chat.cutespirit.org/
   ```
6. 安裝與啟動:
   ```bash
   pnpm install
   pnpm dev                 # http://localhost:3000
   pnpm build && pnpm start
   ```

### 設定管理員
先註冊一個帳號,再到 SQL Editor:
```sql
update public.profiles set identity = 'admin' where email = '你的信箱';
```

## 關於「chat」聊天功能
聊天是獨立的 Workerman WebSocket 服務(`chat.cutespirit.org`),主站只用 iframe 內嵌。
本版保留整合點(首頁 iframe + 登入頁 `chatlogin` 導向 `CHAT_URL`),未移植該伺服器原始碼。

## 已捨棄的遺留檔
原 PHP 專案中沒有任何頁面/導覽連結使用的檔案:`autotype/`、`autotype.php`、`dataaaa/`、
`data.php`、`test.csv`、`igpost.php`、`ip.php`、`test.php`。
