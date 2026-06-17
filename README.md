# 全國高中暈船告白牆（重構版）

<p align="center">
    <img src="public/img/saylove.svg" alt="saylove" width="320" />
</p>
<p align="center">
    <a href="https://saylove.bityo.tw">saylove.bityo.tw</a> ·
    <a href="#-授權-license">CC BY-NC 4.0</a>
</p>

<p align="center">
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" />
    <img alt="React" src="https://img.shields.io/badge/React-19-149eca?logo=react" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript" />
    <img alt="Supabase" src="https://img.shields.io/badge/Supabase-3fcf8e?logo=supabase&logoColor=white" />
    <img alt="License" src="https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey" />
</p>


原本的 PHP 網站版本過舊，本團隊於 2026/06/18 決議將此專案重構為 **Next.js 15 (App Router) + TypeScript + Tailwind CSS**，資料庫與認證改用 **Supabase**。

## Skills
| Items | Content |
| --- | --- |
| Framework | Next.js 15.5.x, React 19 |
| Lang | TypeScript |
| CSS | Bootstrap, Tailwind |
| DB / Auth | Supabase (PostgreSQL + Auth + RLS) |
| UI | react-hot-toast |
| Package Manager | pnpm |
| Deploy | Vercel |


## Installation
### env
```bash
NEXT_PUBLIC_SUPABASE_URL=https://<proj_name>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_public_key>
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
SITE_URL=http://localhost:3000
CHAT_URL=
```

### start
```bash
pnpm i
pnpm dev
pnpm build && pnpm start
```

## 開發者
- 哈密瓜 — <https://github.com/y1220asdf>
- 夏特稀 — <https://github.com/mmm25002500>

## 貢獻
有問題就開 issue。要改東西的話 fork 出去開分支發 PR，commit 訊息寫清楚、確認 `pnpm build` 過得了再丟。
動樣式請用 Tailwind 的 `tw-` 前綴，別改到原本的版面。

## 授權
採用 [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.zh-Hant)，完整條款見 [`LICENSE`](./LICENSE)。
可自由使用、改作、學習，但**不能商用**，且**要標明來源**（Cutespirit Team / saylove.bityo.tw）。

© 2021 Cutespirit Team（靈萌團隊）
