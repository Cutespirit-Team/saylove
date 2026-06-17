import { Suspense } from "react";
import SiteShell from "@/components/SiteShell";
import FlashNotice from "@/components/FlashNotice";

export const dynamic = "force-dynamic";

// 對應 login.php
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ header?: string }>;
}) {
  const { header } = await searchParams;
  return (
    <SiteShell>
      <Suspense fallback={null}>
        <FlashNotice />
      </Suspense>
      <div className="padding">
        <div className="full col-sm-9">
          <div className="row">
            <section className="home">
              <div id="login" className="text">
                <link rel="stylesheet" href="/login.css" />
                <div className="wrapper_love">
                  <div className="header">
                    <div className="top">
                      <center>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/img/-1.svg"
                          alt="instagram"
                          style={{ width: "268px", marginBottom: "15px" }}
                        />
                        <h4>{header ? "登入才可以使用聊天功能優!" : ""}</h4>
                      </center>
                      <div className="form">
                        <form action="/api/checklogin" method="post">
                          <div className="input_field">
                            <input type="email" placeholder="電子郵件" name="email" className="input" />
                          </div>
                          <div className="input_field">
                            <input type="password" placeholder="密碼" name="password" className="input" />
                          </div>
                          <div className="input_field">
                            <input type="hidden" name="header" className="input" defaultValue={header ?? ""} />
                          </div>
                          <button className="btn_love" type="submit">
                            登入
                          </button>
                        </form>
                      </div>
                      <div className="or">
                        <div className="line"></div>
                        <p>或</p>
                        <div className="line"></div>
                      </div>
                      <div className="dif">
                        <div className="forgot">
                          <a href="/forgotpass">忘記密碼?</a>
                        </div>
                      </div>
                    </div>
                    <div className="signup">
                      <p>
                        還沒有帳號嗎? <a href="/register">註冊</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <div className="links"></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
