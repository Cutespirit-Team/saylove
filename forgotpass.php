<?php require("header.php"); ?>
<?php  

if (isset($_SESSION['id']) && isset($_SESSION['Email'])) {
	header("Location: index.php");
	exit();
}
?>
<div class="container">
		<form action="php/forgot-p.php" 
		      method="post">
		   <h4 class="display-4 text-center">忘記密碼</h4><hr><br>
		   <?php if (isset($_GET['alert'])) { ?>
		   <div class="alert alert-danger" role="alert">
			  <?php echo $_GET['alert']; ?>
		    </div>
		   <?php } ?>
		   <div class="form-group">
		     <label for="Email">請輸入您的電子郵件</label>
		     <input type="email" 
		           class="form-control" 
		           id="email" 
		           name="email" 
				   required="required"
		           >
		   </div>
		   <button type="submit" 
		           class="btn btn-primary"
		           name="update">下一步</button>
	    </form>
	</div>
	<script src="script.js"></script>
      
</body>
</html>