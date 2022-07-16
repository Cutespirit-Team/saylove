<?php 
session_start(); 
require_once "db_conn.php";

                

if (isset($_POST['email']) && isset($_POST['password'])) {

	function validate($data){
       $data = trim($data);
	   $data = stripslashes($data);
	   $data = htmlspecialchars($data);
	   return $data;
	}

	$email = htmlentities(validate($_POST['email']));
	$pass = htmlentities(validate($_POST['password']));

	if (empty($email)) {
		header("Location: login.php?error=電子郵件未填");
	    exit();
	}else if(empty($pass)){
        header("Location: login.php?error=密碼未填");
	    exit();
	}else{
		// hashing the password
        $pass = ($pass); //md5
		$sql = "SELECT * FROM users WHERE Email='$email' AND password='$pass'";
		$result = mysqli_query($conn, $sql);
		if (mysqli_num_rows($result) === 1) {
			$row = mysqli_fetch_assoc($result);
            if ($row['Email'] === $email && $row['password'] === $pass) {
            	$_SESSION['Email'] = $row['Email'];
            	$_SESSION['name'] = $row['name'];
            	$_SESSION['id'] = $row['id'];
            	if($_POST['header']=="chatlogin"){
            	header("Location: https://chat.cutespirit.org/");
		        exit();
            	}else{
            	header("Location: index.php?success=登入成功!");
		        exit();}
            }else{
				header("Location: login.php?error=錯誤的帳號或密碼");
		        exit();
			}
		}else{
			header("Location: login.php?error=錯誤的帳號或密碼");
	        exit();
		}
	}
	
}else{
	header("Location: index.php");
	exit();
}