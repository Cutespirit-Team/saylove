import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export const dynamic = "force-dynamic";

// 對應 register.php
export default function RegisterPage() {
  return (
    <>
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
                      </center>
                      <div className="form">
                        <RegisterForm />
                      </div>
                      <div className="or">
                        <div className="line"></div>
                        <p></p>
                        <div className="line"></div>
                      </div>
                      <div className="dif">
                        <div className="forgot">
                          <Link href="/forgotpass"></Link>
                          <p className="ZGwn1">
                            <span>註冊即表示你同意我們的 </span>
                            <a href="" tabIndex={0} target="_blank">
                              服務條款
                            </a>{" "}
                            、{" "}
                            <a href="" tabIndex={0} target="_blank">
                              資料政策
                            </a>{" "}
                            和{" "}
                            <a href="" tabIndex={0} target="_blank">
                              Cookie 政策
                            </a>{" "}
                            。
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="signup">
                      <p>
                        已經有帳號嗎？ <Link href="/login">登入</Link>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <div className="links"></div>
                  <div className="copyright">© 2022 CUTESPIRIT</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
