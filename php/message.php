<?php
session_start();
require_once "../db_conn.php";
$id=$_SESSION['id'];
$email=$_SESSION['Email'];
$sql = "SELECT * FROM users WHERE id='$id'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$message=htmlentities($_POST['message']);
$name=htmlentities($row['name']);
$postid=htmlentities($_POST['postid']);
$time= date("Y/m/d");
$school=htmlentities($_POST['school']);
$sql3 = "SELECT * FROM users WHERE Email='$email' AND id='$id'";
$result3 = mysqli_query($conn, $sql3);
$rows = mysqli_fetch_assoc($result3);
if (mysqli_num_rows($result3) == 0) {
	echo "沒有您的資料，請聯繫管理員";
	exit();
}


	

$illegal = array("#","｛","｝","：","-","/","&","'",'"',"^","%","$","or");
    for($i=0;$i<count($illegal);$i++){
        $sentence=str_replace($illegal[$i],"’",$sentence);
    }
    



if (empty($name)) {
		header("Location: /profiles.php?error=姓名未填，請至個人資料頁面設定");
		exit();
	}else if (empty($message)) {
		header("Location: /index.php?error=想說的話未填");
	}else if (empty($postid)) {
		header("Location: /profiles.php?error=錯誤!，未知的學校，請至個人中心重新選取學校或請聯繫管理員");
		exit();
	}else if (empty($school)){
	    header("Location: /profiles.php?error=錯誤!，未知的學校，，請至個人中心重新選取學校請聯繫管理員");
	    exit();
	} 
	{
	    

       $sql = "INSERT INTO message(message, name, time, school, postid) VALUES('$message', '$name', '$time', '$school','$postid')";
       $result = mysqli_query($conn, $sql);
       if ($result) {
       	  header("Location: https://saylove.cutespirit.org/userpost.php/?id=$postid");
       }else {
          header("Location: /index.php?error=未知的錯誤，請調整格式，如持續錯誤，請立即連絡我們!");
       }
    }





?>