
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
$sql2 = "SELECT * FROM posts WHERE id=$updateid";
$result2 = mysqli_query($conn, $sql2);
$row2 = mysqli_fetch_assoc($result2);
if ($row['identity']!=$admin){
header("Location: index.php");
exit();
}
require("header.php");
?>
<section class="home">
<div id="login" class="text">
    
    
<div class="container">
		<form action="php/update-post.php" 
		      method="post">
            
		   <h4 class="display-4 text-center">更改貼文</h4><hr><br>
		   <?php if (isset($_GET['error'])) { ?>
		   <div class="alert alert-danger" role="alert">
			  <?php echo $_GET['error']; ?>
		    </div>
		   <?php } ?>
		   <div class="form-group">
		     <label for="writer">姓名</label>
		     <input type="text" 
		           class="form-control" 
		           id="writer" 
		           name="writer" 
		           value="<?=$row2['writer'] ?>" >
		   </div>

		   <div class="form-group">
		     <label for="sentence">貼文</label>
		     <input type="text" 
		           class="form-control" 
		           id="sentence" 
		           name="sentence" 
		           value="<?=$row2['sentence'] ?>" >
		   </div>

		   <div class="form-group">
		     <label for="text">學校</label>
		     <input type="text" 
		           class="form-control" 
		           id="school" 
		           name="school" 
		           value="<?=$row2['school'] ?>" >
		   </div>
		   
		   <div class="form-group">
		     <label for="posttime">時間</label>
		     <input type="text" 
		           class="form-control" 
		           id="posttime" 
		           name="posttime" 
		           value="<?=$row2['posttime'] ?>" >
		           

		   <input type="text" 
		          name="id"
		          value="<?=$row2['id']?>"
		          hidden >

		   <button type="submit" 
		           class="btn btn-primary"
		           name="update">更新</button>
	    </form>
	</div>




<script src="script.js"></script>
    

</body>
</html>