import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// 對應原 header.php 的 <head>：bootstrap.css、style.css、cutegirl.js、notice 樣式
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
        <link rel="stylesheet" href="/notice/css/style.css" />
        <link rel="stylesheet" href="/notice/dist/notice.min.css" />
        <link rel="stylesheet" href="/notice/css/default.min.css" />
      </head>
      <body>
        {children}
        {/* 原本由 footer.php 載入的 jQuery / Bootstrap */}
        <Script src="/jquery.js" strategy="afterInteractive" />
        <Script src="/bootstrap.js" strategy="afterInteractive" />
        <Script src="/cutegirl.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
