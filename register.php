 <?php  require("header.php");?>
<?php
if(isset($_GET['error'])){
$errornotice=htmlentities($_GET['error']);
}
?>
<script src="notice/js/highlight.min.js"></script>
    <script>
        hljs.highlightAll();
    </script>

    <script src="notice/dist/notice.min.js"></script>
    <script>
        const notice = new Notice();
    </script>

    <script src="notice/js/main.js"></script>
    <script>
    if("<?php echo $errornotice ;?>" != ""){
        notice.showToast({
        text: '<?php echo $errornotice;?>',
        type: 'warning'
        });
    }
                
     </script> 
    
 <div class="padding">

<div class="full col-sm-9">

<!-- content -->                      

<div class="row">

							  

<!-- main col left --> 

    <section class="home">

        <div id="login" class="text">

        

 <!DOCTYPE html>

<html lang="en">

<head>

	<meta charset="UTF-8">

	<title>登入</title>

	<link rel="stylesheet" href="login.css">
	<link rel="stylesheet" type="text/css" href="login.js">
	

</head>

<body>



<div class="wrapper_love">

	<div class="header">

		<div class="top">

	        <center>

				<img src="/img/-1.svg" alt="instagram" style="width: 268px;margin-bottom: 15px;">

			</center>

			<div class="form">

			    <form action="checksignup.php" method="post">

			    <div class="input_field">

					<input type="text" placeholder="姓名" name="name" class="input">

				</div>

				<div class="input_field">

					<input type="email" placeholder="電子郵件" name="email" class="input">

				</div>

				<div class="input_field">

					<input type="password" placeholder="密碼" id="password-field"  name="password" class="input">
					  <!--<span onclick="show()" class="fa fa-fw fa-eye field-icon toggle-password" ></span>-->

				</div>

				<div class="input_field">

					<input type="password" placeholder="確認密碼" name="re_password" class="input">

				</div>

				

				<button class="btn_love" type="submit">註冊</button>

				</form>

			</div>

			<div class="or">

				<div class="line"></div>

				<p></p>

				<div class="line"></div>

			</div>

			<div class="dif">

				<div class="forgot">

					<a href="/forgotpass.php"></a>

					<p class="ZGwn1"><p><a>註冊即表示你同意我們的 </a></p><a href="" tabindex="0" target="_blank">服務條款</a> 、 <a href="" tabindex="0" target="_blank">資料政策</a> 和 <a href="" tabindex="0" target="_blank">Cookie 政策</a> 。</p>

				</div>

			</div>

		</div>

		<div class="signup">

			<p>已經有帳號嗎？ <a href="/login.php">登入</a></p>

		</div>

		

		</div>

	</div>

	<div class="footer">

		<div class="links">

			

		</div>
		<div class="copyright">
			© 2022 CUTESPIRIT
		</div>
</div>
		 </div>
		 <script>
		     function show(){

              $(this).toggleClass("fa-eye fa-eye-slash");
              var input = $($(this).attr("toggle"));
              if (input.attr("type") == "password") {
                input.attr("type", "text");
              } else {
                input.attr("type", "password");
              }
            }
		 </script>

     <?php  require("footer.php");?>