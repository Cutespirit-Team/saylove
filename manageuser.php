
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
if ($row['identity']!=$admin){
header("Location: index.php");
exit();
}
require("header.php");
require_once "php/read.php";
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
		<div class="box">
			<h4 class="display-4 text-center">會員列表</h4><br>
			<?php if (isset($_GET['success'])) { ?>
		    <div class="alert alert-success" role="alert">
			  <?php echo $_GET['success']; ?>
		    </div>
		    <?php } ?>
			<?php if (mysqli_num_rows($result)) { ?>
			<table class="table table-striped">
			  <thead>
			    <tr>
			      <th scope="col">#</th>
			      <th scope="col">姓名</th>
			      <th scope="col">電子郵件</th>
			      <th scope="col">動作</th>
			    </tr>
			  </thead>
			  <tbody>
			  	<?php 
			  	   $i = 0;
			  	   while($rows = mysqli_fetch_assoc($result)){
			  	   $i++;
			  	 ?>
			    <tr>
			      <th scope="row"><?=$i?></th>
			      <td><?=$rows['name']?></td>
			      <td><?php echo $rows['Email']; ?></td>
			      <td><a href="update-user.php?id=<?=$rows['id']?>" 
			      	     class="btn btn-success">更新資料</a>

			      	  <a href="php/delete-user.php?id=<?=$rows['id']?>" 
			      	     class="btn btn-danger">刪除</a>
			      </td>
			    </tr>
			    <?php } ?>
			  </tbody>
			</table>
			<?php } ?>
			<div class="link-right">
			</div>
		</div>
	</div>
            





  </div>
		 </div>
     <?php  require("footer.php");?>