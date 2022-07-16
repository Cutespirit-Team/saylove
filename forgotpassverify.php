<?php require("header.php"); ?>
<?php  

if (isset($_SESSION['id']) && isset($_SESSION['Email'])) {
	header("Location: index.php");
	exit();
}
?>
<div class="container">
		<form action="php/forgot-p-verify.php" 
		      method="post">
		   <h4 class="display-4 text-center">我們以寄送驗證碼至您的電子郵件</h4><hr><br>
		   <?php if (isset($_GET['error'])) { ?>
		   <div class="alert alert-danger" role="alert">
			  <?php echo $_GET['error']; ?>
		    </div>
		   <?php } ?>
		   <div class="form-group">
		     <label for="email">請再次輸入您的電子郵件</label>
		     <input type="email" 
		           class="form-control" 
		           id="email" 
		           name="email" 
				   required="required"
		           placeholder="Email">
		   </div>
		    <div class="verify">
		     <label for="email">請輸入驗證碼</label>
		     <input type="number" 
		           class="form-control" 
		           id="verify" 
		           name="verify" 
				   required="required"
		           placeholder="Verify">
		   </div>
		    <div class="form-group">
		     <label for="password">請輸入新密碼</label>
		     <input type="password" 
		           class="form-control" 
		           id="password" 
		           name="password" 
				   required="required"
		           placeholder="Password">
		   </div>
		   <div class="form-group">
		     <label for="password">確認新密碼</label>
		     <input type="password" 
		           class="form-control" 
		           id="re_password" 
		           name="re_password" 
				   required="required"
		           placeholder="Re_password">
		   </div>
		   <button type="submit" 
		           class="btn btn-primary"
		           name="update">下一步</button>
	    </form>
	</div>
	<script src="script.js"></script>


</body>
</html>