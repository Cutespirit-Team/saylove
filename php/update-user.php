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

	$sql = "SELECT * FROM users WHERE id=$id";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
    	$row = mysqli_fetch_assoc($result);
    }else {
    	header("Location: read.php");
    }


}else if(isset($_POST['update'])){
    require_once "../db_conn.php";
    function validate($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
	}

	$name = htmlentities(validate($_POST['name']));
	$email = htmlentities(validate($_POST['email']));
        $password = htmlentities(validate($_POST['password']));
	$id = htmlentities(validate($_POST['id']));

	if (empty($name)) {
		header("Location: ../manageuser.php?id=$id&error=姓名未填");
	}else if (empty($email)) {
		header("Location: ../manageuser.php?id=$id&error=電子郵件未填");
	}else if (empty($password)) {
		header("Location: ../manageuser.php?id=$id&error=密碼未填");

        }else {

       $sql = "UPDATE users
               SET name='$name', Email='$email', password='$password' 
               WHERE id=$id ";
       $result = mysqli_query($conn, $sql);
       if ($result) {
       	  header("Location: ../manageuser.php?success=更新成功");
       }else {
          header("Location: ../manageuser.php?id=$id&error=未知的錯誤&$user_data");
       }
	}
}else {
	header("Location: ../manageuser.php");
}
?>