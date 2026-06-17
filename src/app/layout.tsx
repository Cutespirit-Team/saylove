import type { Metadata } from "next";
import Script from "next/script";
import SiteShell from "@/components/SiteShell";
import ToasterProvider from "@/components/ToasterProvider";
import ConfirmProvider from "@/components/ConfirmProvider";
import "./globals.css";

// 對應原 header.php 的 <head>：bootstrap.css、style.css、cutegirl.js
export const metadata: Metadata = {
  title: "全國高中告白牆",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
        <link href="/bootstrap.css" rel="stylesheet" />
        <link href="/style.css" rel="stylesheet" />
      </head>
      <body>
        {/* 右上角 toast 容器（react-hot-toast） */}
        <ToasterProvider />
        {/* SiteShell（導覽列/側欄/頁尾）放在共用 layout，切換頁面時不重載、不轉圈，
            只有頁面內容以 SSR 串流更新；導覽列上的 search 等綁定也因此持續有效。
            ConfirmProvider 提供站內確認對話框（取代 window.confirm）。 */}
        <ConfirmProvider>
          <SiteShell>{children}</SiteShell>
        </ConfirmProvider>
        {/* 原本由 footer.php 載入的 jQuery / Bootstrap */}
        <Script src="/jquery.js" strategy="afterInteractive" />
        <Script src="/bootstrap.js" strategy="afterInteractive" />
        <Script src="/cutegirl.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
