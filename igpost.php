<html>
    <head>
        <link rel="stylesheet" type="text/css" href="/post.css">
    </head>
        <div class="cardpost">
            <div class="toppost">
                <div class="userDetailspost">
                    <div class="profiles_imgpost">
                        <img src="/img/logo.jpg" class="coverpost">
                    </div>
                    <h3>hamugua<br><span>新北高中</span></h3>
                </div>
                <div>
                    <img src="/img/dot.png" class="dotpost">
                </div>
                
                
                <script>
                    function likeButton(){
                        let heart = document.querySelector('.heart');
                        let likes = document.querySelector('.likes');
                        if(heart.src.match('/img/heart.png')){
                            heart.src= "/img/heart_red.png";
                            likes.innerHTML ="3685 likes"
                        }
                        else{
                            heart.src= "/img/heart.png";
                            likes.innerHTML ="3684 likes"
                        }
                    }
                </script>
            </div><div class="messagepost">
                    <h4 class="messagepost"><b>我很帥欸</b></h4><br>
                </div><div class="actionBtnspost">
                    <div style="float: left;">
                        <img src="/img/heart.png" class="heartpost" onclick="likeButton()">
                        <img src="/img/comment.png">
                        <img src="/img/share.png">
                    </div>
                    <div style="float: right;">
                        <img src="/img/bookmark.png">
                    </div><br><br>
                    
                    <h4 class="likespost">3684 likes</h4>
                    <h4 class="commentspost">查看更多</h4>
                    <div class="addCommentspost">
                        <div class="userImgpost">
                            <img src="/img/user.jpg" class="coverpost" style="max-width: 30px;">
                            
                        </div>
                        <input type="text" class="textpost" placeholder="留言..." spellcheck="false" data-ms-editor="true">
                    </div>
                    <h5 class="posTime">4小時前</h5>
                </div>
        </div>
</body>
</html>