<?php 
//error_reporting(E_ALL); 
//ini_set("display_errors", 1);
session_start();
require_once "../db_conn.php";
if (isset($_SESSION['id']) && isset($_SESSION['Email'])) {
	header("Location: index.php");
	exit();
}
?>

<?php
$verify = htmlentities($_POST['verify']);
$email = htmlentities($_POST['email']);
$password = htmlentities($_POST['password']);
$re_password = htmlentities($_POST['re_password']);
$fuck='verify';

if (empty($password)){
    header("Location: ../forgotpassverify.php?error=密碼為空");
    exit();
}
if ($password != $re_password){
    header("Location: ../forgotpassverify.php?error=新密碼和確認新密碼不符或其他錯誤");
    exit();
}

$sql = "SELECT * FROM users WHERE Email='$email' AND forgotpassverifycode='$verify'";
$result = mysqli_query($conn, $sql);
if ($result && mysqli_num_rows($result) === 1) {
    $row = mysqli_fetch_assoc($result);
    if ($row['Email'] === $email && $row['forgotpassverifycode'] === $verify) {
        $sql_2 = "UPDATE users
        	      SET password='$password', forgotpassverifycode='$fuck'
        	      WHERE Email='$email'";
        mysqli_query($conn, $sql_2);
        header("Location: ../forgotpassverify.php?success=您的密碼已經成功變更");
	    exit();
    }else{
        header("Location: ../forgotpassverify.php?error=您的電子郵件或驗證碼錯誤!");
	    exit();
    }

}else{
    header("Location: ../forgotpassverify.php?error=您的電子郵件或驗證碼錯誤!");
    exit();
}


?>