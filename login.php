<?php  require("header.php");?>
<?php
if(isset($_GET['error'])){
$errornotice=htmlentities($_GET['error']);
}
if(isset($_GET['success'])){
$successnotice=htmlentities($_GET['success']);
}
?>
<script>
        hljs.highlightAll();
    </script>

    <script src="notice/dist/notice.min.js"></script>
    <script>
        const notice = new Notice();
    </script>

    <script src="notice/js/main.js"></script>
   
 <div class="padding">
	<div class="full col-sm-9">	
	<!-- content -->                      
			<div class="row">
				 <!-- main col left --> 
								 
    <section class="home">
        <div id="login" class="text">
            <script src="script.js"></script>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>登入</title>
	<link rel="stylesheet" href="login.css">
</head>
<body>
    

<div class="wrapper_love">
	<div class="header">
		<div class="top">
	        <center>
				<img src="/img/-1.svg" alt="instagram" style="width: 268px;margin-bottom: 15px;">
				<h4><?php if(isset($_GET['header'])){echo "登入才可以使用聊天功能優!";} ?></h4>
			</center>
			<div class="form">
			    <form action="checklogin.php" method="post">
				<div class="input_field">
					<input type="email" placeholder="電子郵件" name="email" class="input">
				</div>
				<div class="input_field">
					<input type="password" placeholder="密碼"  name="password" class="input">
				</div>
				<div class="input_field">
					<input type="hidden"   name="header" class="input" value="<?php 
					if(isset($_GET['header'])){echo $_GET['header'];} ?>">
				</div>
				
				<button class="btn_love" type="submit">登入</button>
				
				</form>
				
				 <script src="notice/js/highlight.min.js"></script>
    
				<script>
                if("<?php echo $errornotice ;?>" != ""){
                    notice.showToast({
                    text: '<?php echo $errornotice;?>',
                    type: 'warning'
                    });
                }
                
                </script> 
                <script>
                if("<?php echo $successnotice ;?>" != ""){
                    notice.showToast({
                    text: '<?php echo $successnotice;?>',
                    type: 'success'
                    });
                }
                </script>
			</div>
			<div class="or">
				<div class="line"></div>
				<p>或</p>
				<div class="line"></div>
			</div>
			<div class="dif">
				<div class="forgot">
					<a href="/forgotpass.php">忘記密碼?</a>
					
				</div>
			</div>
		</div>
		<div class="signup">
			<p>還沒有帳號嗎? <a href="/register.php">註冊</a></p>
		</div>
		
		</div>
	</div>
	<div class="footer">
		<div class="links">
			
		</div>
		
	</div>
</div>
 <script src="notice/js/highlight.min.js"></script>
    <script>
        hljs.highlightAll();
    </script>

    <script src="notice/dist/notice.min.js"></script>
    <script>
        const notice = new Notice();
    </script>

    <script src="notice/js/main.js"></script>

								  <!--nonnonodeletediv-->
								  
<?php  require("footer.php");?>