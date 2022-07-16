<?php 
session_start(); 
require_once "db_conn.php";

if (isset($_POST['email']) && isset($_POST['password'])
    && isset($_POST['name']) && isset($_POST['re_password'])) {

	function validate($data){
       $data = trim($data);
	   $data = stripslashes($data);
	   $data = htmlspecialchars($data);
	   return $data;
	}

	$email = htmlentities(validate($_POST['email']));
	$pass = htmlentities(validate($_POST['password']));
	$re_pass = htmlentities(validate($_POST['re_password']));
	$name = htmlentities(validate($_POST['name']));
    $time= date("Y/m/d");
	$user_data = 'email='. $email. '&name='. $name;
    $illegal = array("=","#","!","｛","｝","：","+","-","/","&","'",'"',"^","%","$","or");
    for($i=0;$i<count($illegal);$i++){
        $email=str_replace($illegal[$i],"’",$email);
    }
    $illegal = array("=","'",'"',"^","%","$","or");
    for($i=0;$i<count($illegal);$i++){
        $pass=str_replace($illegal[$i],"’",$pass);
    }

	if (empty($email)) {
		header("Location: /register.php?error=電子郵件未填");
	    exit();
	}else if(empty($pass)){
        header("Location: /register.php?error=密碼未填");
	    exit();
	}
	else if(empty($re_pass)){
        header("Location: /register.php?error=確認密碼未填");
	    exit();
	}

	else if(empty($name)){
        header("Location: /register.php?error=姓名未填");
	    exit();
	}

	else if($pass !== $re_pass){
        header("Location: /register.php?error=密碼和確認密碼不相符");
	    exit();
	}

	else{

		// hashing the password
        $pass = ($pass); //md5

	    $sql = "SELECT * FROM users WHERE Email='$email' ";
		$result = mysqli_query($conn, $sql);

		if (mysqli_num_rows($result) > 0) {
			header("Location: /register.php?error=用戶名被佔用請嘗試另一個");
	        exit();
		}else {
           $sql2 = "INSERT INTO users(Email, password, name, registertime) VALUES('$email', '$pass', '$name', '$time')";
           $result2 = mysqli_query($conn, $sql2);
           if ($result2) {
           	 header("Location: /login.php?success=您的帳戶已成功創建");
	         exit();
           }else {
	           	header("Location: /register.php?error=發生未知錯誤");
		        exit();
           }
		}
	}
	
}else{
	header("Location: index.php");
	exit();
}