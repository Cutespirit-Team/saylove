
<?php 
session_start();
if (isset($_SESSION['id']) && isset($_SESSION['Email'])) {
    $id=$_SESSION['id'];
}
$admin="admin";
require_once "db_conn.php";
$sql = "SELECT * FROM users WHERE id='$id'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$updateid=0;
$updateid=$_GET['id'];
$sql2 = "SELECT * FROM users WHERE id=$updateid";
$result2 = mysqli_query($conn, $sql2);
$row2 = mysqli_fetch_assoc($result2);

if ($row['identity']!=$admin){
header("Location: index.php");
exit();
}
require("header.php");
?>
<div class="padding">
<div class="full col-sm-9">
<!-- content -->                      
<div class="row">
							  
<!-- main col left --> 
<div class="col-sm-5">
<section class="home">
<div id="login" class="text">
    
    
<div class="container">
		<form action="php/update-user.php" 
		      method="post">
            
		   <h4 class="display-4 text-center">更改資料</h4><hr><br>
		   <?php if (isset($_GET['error'])) { ?>
		   <div class="alert alert-danger" role="alert">
			  <?php echo $_GET['error']; ?>
		    </div>
		   <?php } ?>
		   <div class="form-group">
		     <label for="name">姓名</label>
		     <input type="name" 
		           class="form-control" 
		           id="name" 
		           name="name" 
		           value="<?=$row2['name'] ?>" >
		   </div>

		   <div class="form-group">
		     <label for="email">電子郵件</label>
		     <input type="email" 
		           class="form-control" 
		           id="email" 
		           name="email" 
		           value="<?=$row2['Email'] ?>" >
		   </div>

		   <div class="form-group">
		     <label for="pass">密碼</label>
		     <input type="text" 
		           class="form-control" 
		           id="password" 
		           name="password" 
		           value="<?=$row2['password'] ?>" >
		   </div>

		   <input type="text" 
		          name="id"
		          value="<?=$row2['id']?>"
		          hidden >

		   <button type="submit" 
		           class="btn btn-primary"
		           name="update">更新</button>
		    <a href="manageuser.php" class="link-primary">會員列表</a>
	    </form>
	</div>




        </div>
		 </div>
     <?php  require("footer.php");?>