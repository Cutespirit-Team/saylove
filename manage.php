
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
?>
<div class="padding">
<div class="full col-sm-9">
<!-- content -->                      
<div class="row">
							  
<!-- main col left --> 
<div class="col-sm-5">
    <section class="home">
        <div id="login" class="text">
           <a href="http://saylove.cutespirit.org/manageuser.php" 
	 class="btn btn-info">會員管理</a>
     <a href="http://saylove.cutespirit.org/manageposts.php" 
	 class="btn btn-info">貼文管理</a>
            <script src="script.js"></script>


  </div>
		 </div>
     <?php  require("footer.php");?>