import { Suspense } from "react";
import Link from "next/link";
import FlashNotice from "@/components/FlashNotice";
import LoginForm from "@/components/LoginForm";

export const dynamic = "force-dynamic";

// 對應 login.php
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ header?: string }>;
}) {
  const { header } = await searchParams;
  const chatUrl = process.env.CHAT_URL || "https://chat.cutespirit.org/";
  return (
    <>
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
                        <LoginForm header={header} chatUrl={chatUrl} />
                      </div>
                      <div className="or">
                        <div className="line"></div>
                        <p>或</p>
                        <div className="line"></div>
                      </div>
                      <div className="dif">
                        <div className="forgot">
                          <Link href="/forgotpass">忘記密碼?</Link>
                        </div>
                      </div>
                    </div>
                    <div className="signup">
                      <p>
                        還沒有帳號嗎? <Link href="/register">註冊</Link>
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
    </>
  );
}
