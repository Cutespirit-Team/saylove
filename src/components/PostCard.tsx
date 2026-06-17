import Link from "next/link";
import type { PostRow, MessageRow, ProfileRow } from "@/lib/types";
import { DEFAULT_AVATAR } from "./defaultAvatar";
import CopyLinkButton from "./CopyLinkButton";
import LikeButton from "./LikeButton";
import CommentForm from "./CommentForm";
import PostMenu from "./PostMenu";

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
  const likesNum = Number(post.likes) > 0 ? `${post.likes}likes` : "0 likes";
  // 作者本人或管理員可修改 / 刪除這篇貼文
  const canManage =
    !!viewer && (viewer.id === post.author_id || viewer.identity === "admin");

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
                  <Link href={`/posts?school=${post.school}`}>{post.school}</Link>
                </span>
              </h3>
            </div>
            <div>
              <PostMenu postid={post.id} sentence={post.sentence ?? ""} canManage={canManage} />
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
              {/* 未登入不顯示愛心 */}
              {loggedIn && <LikeButton postid={post.id} school={post.school ?? ""} liked={liked} />}

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/comment.png" alt="" />
              {/* 分享按鈕本身就是「複製文章連結」 */}
              <CopyLinkButton path={`/userpost?id=${post.id}`} />
            </div>
            <div style={{ float: "right" }}>
              {/* 未登入不顯示收藏 */}
              {loggedIn && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/img/bookmark.png" alt="" />
              )}
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
              <CommentForm postid={post.id} school={post.school ?? ""} loggedIn={loggedIn} />
            </div>
            <h5 className="posTime">{post.posttime}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
