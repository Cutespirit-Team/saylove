
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

if(isset($_GET['id'])){
   require_once "../db_conn.php";
    function validate($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
	}

	$id = validate($_GET['id']);

	$sql = "DELETE FROM users
	        WHERE id=$id";
   $result = mysqli_query($conn, $sql);
   if ($result) {
   	  header("Location: ..//manageuser.php?success=成功刪除");
   }else {
      header("Location: ..//manageuser.php?error=未知的錯誤&$user_data");
   }

}else {
	header("Location: ../manageuser.php");
}
?>