"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import LogoutLink from "@/components/LogoutLink";

declare global {
  interface Window {
    suggestions?: string[];
  }
}

// 導覽列/側欄/頁尾外框。手機版的側欄(offcanvas)與導覽列下拉改用 React state 控制,
// 不再依賴舊 Bootstrap/jQuery 的 data-toggle(在 Next 會綁定失敗)。
export default function SiteChrome({
  loggedIn,
  isAdmin,
  schoolNames,
  children,
}: {
  loggedIn: boolean;
  isAdmin: boolean;
  schoolNames: string[];
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // 搜尋自動完成的學校清單（search.next.js 會讀取全域 suggestions）
  useEffect(() => {
    window.suggestions = schoolNames;
  }, [schoolNames]);

  return (
    <div className="wrapper">
      <div className="box">
        <div className={`row row-offcanvas row-offcanvas-left${sidebarOpen ? " active" : ""}`}>
          {/* sidebar */}
          <div className="column col-sm-2 col-xs-1 sidebar-offcanvas" id="sidebar">
            <ul className="nav">
              <li>
                <a
                  href="#"
                  className="visible-xs text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setSidebarOpen((v) => !v);
                  }}
                >
                  <i className={`glyphicon ${sidebarOpen ? "glyphicon-chevron-left" : "glyphicon-chevron-right"}`}></i>
                </a>
              </li>
            </ul>

            <ul className={`nav ${sidebarOpen ? "visible-xs" : "hidden-xs"}`} id="lg-menu">
              <li className="active">
                <a href="#featured">
                  <i className="glyphicon glyphicon-list-alt"></i>哈密瓜好帥
                </a>
              </li>
              <li>
                <a href="#stories">
                  <i className="glyphicon glyphicon-list"></i> 哈密瓜好
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="glyphicon glyphicon-paperclip"></i> 哈密瓜好
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="glyphicon glyphicon-refresh"></i> 哈密瓜好
                </a>
              </li>
            </ul>

            {/* tiny only nav */}
            <ul className={`nav ${sidebarOpen ? "hidden-xs" : "visible-xs"}`} id="xs-menu">
              <li>
                <a href="#featured" className="text-center">
                  <i className="glyphicon glyphicon-list-alt"></i>
                </a>
              </li>
              <li>
                <a href="#stories" className="text-center">
                  <i className="glyphicon glyphicon-list"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-center">
                  <i className="glyphicon glyphicon-paperclip"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-center">
                  <i className="glyphicon glyphicon-refresh"></i>
                </a>
              </li>
            </ul>
          </div>
          {/* /sidebar */}

          {/* main right col */}
          <div className="column col-sm-10 col-xs-11" id="main">
            {/* top nav */}
            <div className="navbar navbar-blue navbar-static-top">
              <div className="navbar-header">
                <button
                  className="navbar-toggle"
                  type="button"
                  aria-expanded={navOpen}
                  onClick={() => setNavOpen((v) => !v)}
                >
                  <span className="sr-only">Toggle</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <div className="tittleimg">
                  <Link href="/">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/img/-1.svg" width="250px" alt="" />
                  </Link>
                </div>
              </div>
              <nav className={`collapse navbar-collapse${navOpen ? " in" : ""}`} role="navigation">
                <form className="navbar-form navbar-left">
                  <div className="input-group input-group-sm" style={{ maxWidth: "360px" }}>
                    <link rel="stylesheet" href="/search.css" />
                    <div className="wrapper" style={{ float: "right" }}>
                      <div className="search-input">
                        <a href="" target="_blank" hidden></a>
                        <input type="text" placeholder="搜尋您的高中..." />
                        <div className="autocom-box"></div>
                        <div className="icon">
                          {/* 內嵌放大鏡 SVG（取代會被擋的 fontawesome kit） */}
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="11" cy="11" r="7" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="input-group-btn"></div>
                  </div>
                </form>

                {/* 學校建議清單由上面的 useEffect 設成 window.suggestions;search.next.js 會讀它 */}
                <Script src="/search.next.js" strategy="afterInteractive" />

                <ul className="nav navbar-nav" onClick={() => setNavOpen(false)}>
                  <li>
                    <Link href="/">
                      <i className="glyphicon glyphicon-home"></i> 首頁
                    </Link>
                  </li>
                  {!loggedIn && (
                    <li>
                      <Link href="/login">登入</Link>
                    </li>
                  )}
                  {loggedIn && (
                    <li>
                      <Link href="/profiles">個人資料</Link>
                    </li>
                  )}
                  {loggedIn && (
                    <li>
                      <Link href="/upload_posts" role="button">
                        <i className="glyphicon glyphicon-plus"></i> 新增貼文
                      </Link>
                    </li>
                  )}
                  {isAdmin && (
                    <li>
                      <Link href="/manage">管理中心</Link>
                    </li>
                  )}
                  {loggedIn && (
                    <li>
                      <LogoutLink />
                    </li>
                  )}
                </ul>
              </nav>
            </div>
            {/* /top nav */}

            <div className="site-content">{children}</div>

            {/* ===== footer ===== */}
            <footer className="site-footer" id="footer">
              <div className="site-footer__links">
                <a href="https://github.com/Cutespirit-Team">Github</a>{" "}
                <small className="text-muted">|</small>{" "}
                <a href="https://fb.cutespirit.org">Facebook</a>{" "}
                <small className="text-muted">|</small>{" "}
                <a href="https://ig.cutespirit.org">Instagram</a>{" "}
                <small className="text-muted">|</small>{" "}
                <a href="https://www.cutespirit.org">靈萌團隊官網</a>{" "}
                <small className="text-muted">|</small>{" "}
                <a href="https://shop.cutespirit.org">靈萌商店</a>{" "}
                <small className="text-muted">|</small>{" "}
                <Link href="/instructions/disclaimer">免責聲明</Link>{" "}
                <small className="text-muted">|</small>{" "}
                <Link href="/instructions/policy">隱私權政策</Link>{" "}
                <small className="text-muted">|</small>{" "}
                <Link href="/instructions/cookie">Cookie政策</Link>{" "}
                <small className="text-muted">|</small>{" "}
                <Link href="/instructions/api">API</Link>{" "}
                <small className="text-muted">|</small>{" "}
                <Link href="/instructions/terms_of_use">使用條款</Link>
              </div>
              <div className="site-footer__copy">© 2022 CUTESPIRIT</div>
              <hr />
              <h4 className="text-center">
                <a href="" target="ext">
                  hamigua//TershiXia
                </a>
              </h4>
            </footer>
          </div>
          {/* /main */}
        </div>
      </div>
    </div>
  );
}
