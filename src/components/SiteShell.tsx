import Script from "next/script";
import Link from "next/link";
import LogoutLink from "@/components/LogoutLink";
import { getCurrentProfile } from "@/lib/auth";
import { getSchoolNames } from "@/lib/school";

// 對應 header.php + footer.php：包住每個頁面的外框（側欄、導覽列、頁尾、貼文 modal）。
export default async function SiteShell({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();
  const loggedIn = !!profile;
  const isAdmin = !!profile && profile.identity === "admin";
  const schoolNames = await getSchoolNames();
  const suggestionsLiteral = "[" + schoolNames.map((n) => JSON.stringify(n)).join(",") + "]";

  return (
    <div className="wrapper">
      <div className="box">
        <div className="row row-offcanvas row-offcanvas-left">
          {/* sidebar */}
          <div className="column col-sm-2 col-xs-1 sidebar-offcanvas" id="sidebar">
            <ul className="nav">
              <li>
                <a href="#" data-toggle="offcanvas" className="visible-xs text-center">
                  <i className="glyphicon glyphicon-chevron-right"></i>
                </a>
              </li>
            </ul>

            <ul className="nav hidden-xs" id="lg-menu">
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
            <ul className="nav visible-xs" id="xs-menu">
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
                  data-toggle="collapse"
                  data-target=".navbar-collapse"
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
              <nav className="collapse navbar-collapse" role="navigation">
                <form className="navbar-form navbar-left">
                  <div className="input-group input-group-sm" style={{ maxWidth: "360px" }}>
                    <link rel="stylesheet" href="/search.css" />
                    <div className="wrapper" style={{ float: "right" }}>
                      <div className="search-input">
                        <a href="" target="_blank" hidden></a>
                        <input type="text" placeholder="搜尋您的高中..." />
                        <div className="autocom-box"></div>
                        <div className="icon">
                          <i className="fas fa-search"></i>
                        </div>
                      </div>
                    </div>
                    <div className="input-group-btn"></div>
                  </div>
                </form>

                {/* 由 school.csv 產生的學校建議清單（覆蓋 suggestions.js 的示範資料） */}
                <Script
                  id="school-suggestions"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{ __html: `let suggestions = ${suggestionsLiteral};` }}
                />
                <Script src="https://kit.fontawesome.com/a076d05399.js" strategy="afterInteractive" />
                <Script src="/search.next.js" strategy="afterInteractive" />

                <ul className="nav navbar-nav">
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
                      <Link href="/upload_posts" role="button" data-toggle="modal">
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

            {children}

            {/* ===== footer.php ===== */}
            <br />
            <div style={{ height: "2px" }}>
              <div className="row" id="footer" style={{ float: "right" }}>
                <a href="#" className="pull-right">
                  © 2022 CUTESPIRIT
                </a>
              </div>
              <div className="row" id="footer" style={{ float: "left" }}>
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
                <Link href="/instructions/terms_of_use">使用條款</Link>{" "}
                <small className="text-muted">|</small>{" "}
              </div>
            </div>
            <hr />
            <h4 className="text-center">
              <a href="" target="ext">
                hamigua//TershiXia
              </a>
            </h4>
            <hr />
          </div>
          {/* /main */}
        </div>
      </div>

      {/* post modal */}
      <div id="postModal" className="modal fade" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                ×
              </button>
              Update Status
            </div>
            <div className="modal-body">
              <form className="form center-block">
                <div className="form-group"></div>
              </form>
            </div>
            <div className="modal-footer">
              <div>
                <button className="btn btn-primary btn-sm" data-dismiss="modal" aria-hidden="true">
                  Post
                </button>
                <ul className="pull-left list-inline">
                  <li>
                    <a href="">
                      <i className="glyphicon glyphicon-upload"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="glyphicon glyphicon-camera"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="glyphicon glyphicon-map-marker"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 原 footer.php 的 offcanvas 切換腳本 */}
      <Script id="offcanvas-toggle" strategy="afterInteractive">{`
        document.addEventListener('DOMContentLoaded', function () {
          if (typeof jQuery === 'undefined') return;
          jQuery(function ($) {
            $('[data-toggle=offcanvas]').click(function () {
              $(this).toggleClass('visible-xs text-center');
              $(this).find('i').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
              $('.row-offcanvas').toggleClass('active');
              $('#lg-menu').toggleClass('hidden-xs').toggleClass('visible-xs');
              $('#xs-menu').toggleClass('visible-xs').toggleClass('hidden-xs');
              $('#btnShow').toggle();
            });
          });
        });
      `}</Script>
    </div>
  );
}
