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
?>
<?php  

require_once "db_conn.php";

$sql = "SELECT * FROM posts ORDER BY id DESC";
$result = mysqli_query($conn, $sql);
?>