<?php 
session_start();
if (isset($_SESSION['id']) && isset($_SESSION['Email'])) {
    $id=$_SESSION['id'];
}
$admin="admin";
require_once "../db_conn.php";
$sql = "SELECT * FROM users WHERE id='$id'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
if ($row['identity']!=$admin){
header("Location: index.php");
exit();
}
?>
<?php
if (isset($_GET['id'])) {
	require_once "../db_conn.php";

	function validate($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
	}

	$id = validate($_GET['id']);

	$sql = "SELECT * FROM posts WHERE id=$id";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
    	$row = mysqli_fetch_assoc($result);
    }else {
    	header("Location: ../manageposts.php");
    }


}else if(isset($_POST['update'])){
    require_once "../db_conn.php";
    function validate($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
	}

	$writer = validate($_POST['writer']);
	$sentence = validate($_POST['sentence']);
    $school = validate($_POST['school']);
    $posttime = validate($_POST['posttime']); 
	$id = validate($_POST['id']);

	if (empty($writer)) {
		header("Location: ../manageuser.php?id=$id&error=姓名未填");
	}else if (empty($sentence)) {
		header("Location: ../manageuser.php?id=$id&error=貼文內容未填");
	}else if (empty($school)) {
		header("Location: ../manageuser.php?id=$id&error=學校未填");

        }else {

       $sql = "UPDATE posts
               SET writer='$writer', sentence='$sentence', school='$school' ,posttime='$posttime' 
               WHERE id=$id ";
       $result = mysqli_query($conn, $sql);
       if ($result) {
       	  header("Location: ../manageposts.php?success=更新成功");
       }else {
          header("Location: ../manageposts.php?id=$id&error=未知的錯誤&$user_data");
       }
	}
}else {
	header("Location: ../manageposts.php");
}
?>