import type { PostRow, MessageRow, ProfileRow } from "@/lib/types";
import { DEFAULT_AVATAR } from "./defaultAvatar";
import CopyLinkButton from "./CopyLinkButton";

// 重現 index.php / posts.php / userpost.php 共用的告白卡片。
export default function PostCard({
  post,
  viewer,
  loggedIn,
  liked,
  messages,
}: {
  post: PostRow;
  viewer: ProfileRow | null;
  loggedIn: boolean;
  liked: boolean;
  messages: MessageRow[];
}) {
  const siteUrl = process.env.SITE_URL || "http://localhost:3000";
  const shareLink = `${siteUrl}/userpost?id=${post.id}`;
  const likesNum = Number(post.likes) > 0 ? `${post.likes}likes` : "0 likes";

  // 留言區頭像（依當前登入者性別）
  let viewerAvatar: React.ReactNode;
  if (viewer && viewer.gender === "男") {
    // eslint-disable-next-line @next/next/no-img-element
    viewerAvatar = <img src="/img/man.jpg" className="coverpost" style={{ maxWidth: "30px" }} alt="" />;
  } else if (viewer && viewer.gender === "女") {
    // eslint-disable-next-line @next/next/no-img-element
    viewerAvatar = <img src="/img/girl.jpg" className="coverpost" style={{ maxWidth: "30px" }} alt="" />;
  } else {
    // eslint-disable-next-line @next/next/no-img-element
    viewerAvatar = <img src={DEFAULT_AVATAR} className="coverpost" style={{ maxWidth: "30px" }} alt="" />;
  }

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <div className="cardpost">
          <div className="toppost">
            <div className="userDetailspost">
              <div className="profiles_imgpost">
                {post.gender === "男" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/img/man.jpg" className="coverpost" alt="" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/img/girl.jpg" className="coverpost" alt="" />
                )}
              </div>
              <h3>
                {post.writer}
                <br />
                <span>
                  <a href={`/posts?school=${post.school}`}>{post.school}</a>
                </span>
              </h3>
            </div>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/dot.png" className="dotpost" alt="" />
            </div>
          </div>
          <div className="messagepost">
            <h4 className="messagepost">
              <b>{post.sentence}</b>
            </h4>
            <br />
          </div>
          <div className="actionBtnspost">
            <div style={{ float: "left" }}>
              <form action="/api/likes" method="post">
                <input type="hidden" name="messagelikes" defaultValue="YES" className="textpost" />
                <input type="hidden" name="school" defaultValue={post.school ?? ""} className="textpost" />
                <input type="hidden" name="postid" defaultValue={String(post.id)} className="textpost" />
                <button style={{ border: "none", backgroundColor: "transparent", float: "left" }}>
                  {liked ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="/img/heart_red.png" className="heartpost" alt="" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="/img/heart.png" className="heartpost" alt="" />
                  )}
                </button>
              </form>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/comment.png" alt="" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/share.png" alt="" />
              <CopyLinkButton link={shareLink} />
            </div>
            <div style={{ float: "right" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/bookmark.png" alt="" />
            </div>
            <br />
            <br />
            <br />

            <h4 className="likespost">{likesNum}</h4>

            {messages.map((m) =>
              m.message ? (
                <h4 className="messagepost" key={m.id}>
                  <b>
                    {m.name}:{m.message}
                  </b>
                </h4>
              ) : null
            )}

            <h4 className="commentspost">查看更多</h4>
            <div className="addCommentspost">
              <div className="userImgpost">{viewerAvatar}</div>
              <form action="/api/message" method="post">
                <input
                  type="text"
                  name="message"
                  className="textpost"
                  placeholder={loggedIn ? "留言..." : "請先登入才能留言喔!"}
                  spellCheck={false}
                  data-ms-editor="true"
                  required
                  readOnly={!loggedIn}
                />
                <input type="hidden" name="postid" defaultValue={String(post.id)} className="textpost" />
                <input type="hidden" name="school" defaultValue={post.school ?? ""} className="textpost" />
                <button className="sqdOP yWX7d    y3zKF     " type="submit" disabled={!loggedIn}>
                  <div className="_7UhW9   xLCgt        qyrsm      gtFbE     uL8Hv        T0kll ">發佈</div>
                </button>
              </form>
            </div>
            <h5 className="posTime">{post.posttime}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
