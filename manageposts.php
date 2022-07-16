
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
require_once "php/readpost.php";
?>
<div class="padding">
<div class="full col-sm-9">
<!-- content -->                      
<div class="row">
							  

<section class="home">
        <div id="login" class="text">
		    <div class="box weight auto">
			<h4 class="pgtitle center">貼文管理</h4><br>
			<?php if (isset($_GET['success'])) { ?>
		    <div class="alert alert-success" role="alert">
			  <?php echo $_GET['success']; ?>
		    </div>
		    <?php } ?>
			<?php if (mysqli_num_rows($result)) { ?>
			<table class="table table-striped">
			  <thead>
			    <tr>
			      <th class='text1234' scope="col">#</th>
			      <th class='text1234' scope="col">姓名</th>
			      <th class='text1234' scope="col">貼文</th>
			      <th class='text1234' scope="col">學校</th>
			      <th class='text1234' scope="col">詳情</th>
			      <th class='text1234' scope="col">動作</th>
			    </tr>
			  </thead>
			  <tbody>
			  	<?php 
			  	   $i = 0;
			  	   while($rows = mysqli_fetch_assoc($result)){
			  	   $i++;
			  	 ?>
			    <tr>
			      <th class='text1234'scope="row"><?=$i?></th>
			      <td class='text1234'><?=$rows['writer']?></td>
			      <td class='text1234' ><?php echo $rows['sentence']; ?></td>
			      <td class='text1234'><?php echo $rows['school']; ?></td>
			      <td class='text1234'><?php echo $rows['date']; ?></td>
			      <td class='text1234'><a href="update-post.php?id=<?=$rows['id']?>" 
			      	     class="btn btn-success">更新資料</a>

			      	  <a href="php/delete-post.php?id=<?=$rows['id']?>" 
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
     <?php  require("footer.php");?>