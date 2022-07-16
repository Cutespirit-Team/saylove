<?php  require("header.php");?>
<div class="padding">
    <div class="full col-sm-9">
    <!-- content -->                      
        <div class="row">
        <!-- main col left --> 
            <div class="col-sm-5">
                <section class="home">
                    <div id="login" class="text">
            <?php
                $file_path = "school/school.csv"; //檔案名稱
                if(file_exists($file_path)){ //檔案是否存在
                $fp = fopen($file_path,"r"); //檔案以唯獨開啟
                $str = "";
                $arr = array();//陣列
                while(!feof($fp)){
                    $str = explode("\n", fgets($fp));
                    array_push($arr,$str);
                    //丟進去陣列
                }
                $schoolCodeArr=array();
                for ($i=0;$i<count($arr);$i++){
                    $schoolInfoStr= explode(",", $arr[$i][0]);
                    array_push($schoolCodeArr,$schoolInfoStr);
                }
                for ($i = 0;$i<count($arr);$i++){
                    // echo '<option value="'.$schoolCodeArr[$i][1].'" >'.$schoolCodeArr[$i][0].'</option>';
                    // if (trim($row['school']) == $schoolCodeArr[$i][1]){
                        // $pageschoolcode=$schoolCodeArr[$i][1];
                        // echo '<option selected value="'.$schoolCodeArr[$i][1].'"  >'.$schoolCodeArr[$i][0].'</option>';
                    // }
                    }
                }
            ?>
            <?php 
            if(mysqli_num_rows($result)==0){
                echo "您尚未登入";
            }
            ?>
            <h4 class="display-4 text-center"><?php if ( isset($_GET['school'])){echo $_GET['school'];} ?></h4>
            <?php
            $count = 0;
            for ($i = 0;$i<count($arr);$i++){
                if(trim($_GET['school']) == trim($schoolCodeArr[$i][0])){
                    $count = 1;
                }
            }
            switch ($count){
                case 0:
                    header("Location: http://saylove.cutespirit.org/index.php?id=$id&alert=未知的學校");
                    break;
                case 1:
                    break;
            }
            ?>
            <table class="table table-striped">
                <tbody>
                    <?php
    			  	for ($i = 0;$i<count($arr);$i++){
                        if (trim($_GET['school']) == $schoolCodeArr[$i][0]){
                            $pageschoolcode=$schoolCodeArr[$i][1];//轉換為學校代碼//
                        }
                    }
                    $sql1 = "SELECT * FROM  $posts WHERE schoolcode='".trim($pageschoolcode)."' ORDER BY id DESC";
                    $result1 = mysqli_query($conn, $sql1);
                    if (mysqli_num_rows($result1) <1) {
                        echo "<div class='display-4 text-center'>此學校目前沒有貼文喔!</div>";
                    }
                    $p = 0;
                    while($rows = mysqli_fetch_assoc($result1)){
                        $p++;
                    ?>
    			   <link rel="stylesheet" type="text/css" href="/post.css">
						<link rel="stylesheet" type="text/css" href="postttt.css">
						<div class="panel panel-default">
						<div class="panel-heading">
						 <div class="cardpost">
            <div class="toppost">
                <div class="userDetailspost">
                    <div class="profiles_imgpost">
                        <?php
                        if($rows['gender']=="男"){
                            echo"<img src='/img/man.jpg' class='coverpost'>";
                        }else{
                            echo"<img src='/img/girl.jpg' class='coverpost'>";
                        }
                         ?>
                    </div>
                    <h3><?php echo $rows['writer'] ;?><br><span><?php echo '<a href="/posts.php?school='.$rows['school'].'">'.$rows['school'].'</a>';?></span></h3>
                </div>
                <div>
                    <img src="/img/dot.png" class="dotpost">
                </div>
                <script>
                    function likeButton(){
                        let heart = document.querySelector('.heartpost');
                        let likes = document.querySelector('.likespost');
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
                    <h4 class="messagepost"><b><? echo $rows['sentence']?></b></h4><br>
                </div><div class="actionBtnspost">
                    <div style="float: left;">
                        <form action="php/likes.php" 
		                    method="post">
                            
                            
                        <input type="hidden"
                        id="messagelikes"
                        name="messagelikes"
                        value='YES';
                        class="textpost" 
                        >
                        
                        <input type="hidden"
                        id="school"
                        name="school"
                        value="<?php echo $rows['school'];?>"
                        class="textpost" 
                        >
                        
                        
                        <input type="hidden" 
                        id="postid"
                        name="postid"
                        value="<?php echo $rows['id'];?>"
                        class="textpost" 
                        >
                        <?php
                        $sqlhave = "SELECT * FROM likes WHERE userid='$id' AND postid='".$rows['id']."'";
	                    $resulthave = mysqli_query($conn, $sqlhave);
                        if(mysqli_num_rows($resulthave) == 1){
                            
                        echo "<button style='border: none;background-color: transparent; float: left'><img src='/img/heart_red.png' class='heartpost' ></button>";
                        
                            
                        }else{
                        echo "<button style='border: none;background-color: transparent; float: left'><img src='/img/heart.png' class='heartpost' ></button>";
                            
                        }
                        ?>
                        </form>
                        <img src="/img/comment.png">
                        <img src="/img/share.png">
                        <input value="<?php echo 'https://saylove.cutespirit.org/userpost.php/?id='.$rows['id'];?>" style="display:none;"/><button class="copy_coupon">點我複製文章連結</button>

                        <script src='//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js'></script>
                        <script>
                        window.Clipboard = (function(window, document, navigator) {
                        var textArea,
                        copy;
                        
                        function isOS() {
                        return navigator.userAgent.match(/ipad|iphone/i);
                        }
                        
                        function createTextArea(text) {
                        textArea = document.createElement('textArea');
                        textArea.value = text;
                        document.body.appendChild(textArea);
                        }
                        
                        function selectText() {
                        var range,
                        selection;
                        
                        if (isOS()) {
                        range = document.createRange();
                        range.selectNodeContents(textArea);
                        selection = window.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(range);
                        textArea.setSelectionRange(0, 999999);
                        } else {
                        textArea.select();
                        }
                        }
                        
                        function copyToClipboard() {
                        document.execCommand("Copy");
                        document.body.removeChild(textArea);
                        }
                        
                        copy = function(text) {
                        createTextArea(text);
                        selectText();
                        copyToClipboard();
                        };
                        
                        return {
                        copy: copy
                        };
                        })(window, document, navigator);
                        
                        $(".copy_coupon").on("click", function() {
                        var $this = $(this),
                        value = $this.prev("input").val();
                        window.Clipboard.copy(value);
                        });
                        </script>
                        </div>
                        <div style="float: right;">
                            <img src="/img/bookmark.png">
                        </div><br><br>
                        
                        <h4 class="likespost">
                            <?php 
                            if ((int)$rows['likes']>0){
                            echo $rows['likes'].'likes';
                            }else{
                            echo "0 likes";}
                            ?>
                        </h4>
                        <?php
                       $postid=$rows['id'];
                       $sqlmsg = "SELECT * FROM  message  WHERE postid = '".$rows['id']."' ORDER BY id DESC ";
					   $resultmsg = mysqli_query($conn, $sqlmsg);
					   while($rowsmsg = mysqli_fetch_assoc($resultmsg)){
                        ?>
                        <h4 class="messagepost" ><b><?php if(!empty($rowsmsg['message'])){echo $rowsmsg['name'].':'.$rowsmsg['message'];}?></b></h4>
                        <? } ?>
                        <h4 class="commentspost">查看更多</h4>
                        <div class="addCommentspost">
                        <div class="userImgpost">
                        
                            <?php
                            if(!empty($row['gender']) and $row['gender']=="男"){
                                echo"<img src='/img/man.jpg' class='coverpost' style='max-width: 30px;'>";
                            }elseif(!empty($row['gender']) and $row['gender']=="女"){
                                echo"<img src='/img/girl.jpg' class='coverpost' style='max-width: 30px;'>";
                            }else{
                                echo"<img src='data:image/jpeg;base64,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' class='coverpost' style='max-width: 30px;'>";
                            }
                         ?>
                            
                        </div>
                        <form action="php/message.php" 
		                    method="post">
                        <input type="text" 
                        id="message"
                        name="message"
                        class="textpost" 
                        <?php if (isset($_SESSION['id']) && isset($_SESSION['Email'])) {
                                echo "placeholder='留言...'";}else{
                                echo "placeholder='請先登入才能留言喔!'";}    
                                
                                ?>
                        spellcheck="false" 
                        data-ms-editor="true"
                        required="required"
                        <?php if (isset($_SESSION['id']) && isset($_SESSION['Email'])) {
                               }else{
                                echo "readonly='readonly' /'";}    
                                
                                ?>
                        >
                        <input type="hidden" 
                        id="postid"
                        name="postid"
                        value="<?php echo $rows['id'];?>"
                        class="textpost" 
                        >
                        <input type="hidden" 
                        id="school"
                        name="school"
                        value="<?php echo $rows['school'];?>"
                        class="textpost" 
                        >
                        <button class="sqdOP yWX7d    y3zKF     "  type="submit" 
                        <?php if (isset($_SESSION['id']) && isset($_SESSION['Email'])) {
                               }else{
                                echo "disabled='disabled' ";}    
                                
                                ?> >
                            <div class="_7UhW9   xLCgt        qyrsm      gtFbE     uL8Hv        T0kll ">發佈</div></button>
                        </form>
                    </div>
                    <h5 class="posTime"><?echo $rows['posttime']; ?></h5>
                </div>
                    </div>
					</div>
					</div>
				<?php } ?>
			</div>
<?php  require("footer.php");?>