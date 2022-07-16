<?php
session_start();
require_once "../db_conn.php";
$id=$_SESSION['id'];
$email=$_SESSION['Email'];
$sql = "SELECT * FROM users WHERE id='$id'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$sentence=htmlentities($_POST['sentence']);
$name=htmlentities($row['name']);
$gender=htmlentities($row['gender']);
$schoolcode=htmlentities($row['school']);
$time= date("Y/m/d");
$school=htmlentities($_POST['school']);
$id=$_SESSION['id'];
$email=$_SESSION['Email'];
$sql3 = "SELECT * FROM users WHERE Email='$email' AND id='$id'";
$result3 = mysqli_query($conn, $sql3);
$rows = mysqli_fetch_assoc($result3);
if (mysqli_num_rows($result3) == 0) {
	echo "沒有您的資料，請聯繫管理員";
	exit();
}


	

$illegal = array("#","｛","｝","：","-","/","&","'",'"',"^","%","$","or",";");
    for($i=0;$i<count($illegal);$i++){
        $sentence=str_replace($illegal[$i],"’",$sentence);
    }
    



if (empty($name)) {
		header("Location: /upload_posts.php?sentence=$sentence?id=$id?error=姓名未填，請至個人資料頁面設定");
		exit();
	}else if (empty($sentence)) {
		header("Location: /upload_posts.php?sentence=$sentence?id=$id?error=想說的話未填");
	}else if (empty($schoolcode)) {
		header("Location: /upload_posts.php?sentence=$sentence?id=$id?error=錯誤!，未知的學校，請至個人中心重新選取學校或請聯繫管理員");
		exit();
	}else if (empty($school)){
	    header("Location: /upload_posts.php?sentence=$sentence?id=$id?error=錯誤!，未知的學校，，請至個人中心重新選取學校請聯繫管理員");
	    exit();
	} 
	{
	    
	    
	    
	    

function GetIP() 
{ 
	    if (getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP"), "unknown")) 
		            $ip = getenv("HTTP_CLIENT_IP"); 
	        else if (getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR"), "unknown")) 
			        $ip = getenv("HTTP_X_FORWARDED_FOR"); 
	        else if (getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR"), "unknown")) 
			        $ip = getenv("REMOTE_ADDR"); 
	        else if (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown")) 
			        $ip = $_SERVER['REMOTE_ADDR']; 
	        else 
			        $ip = "unknown"; 
	        return($ip); 
	    } 

        $cookie = $_SERVER['QUERY_STRING']; 

        $register_globals = (bool) ini_get('register_gobals'); 

	    if ($register_globals) $ip = getenv('REMOTE_ADDR'); 
	    else $ip = GetIP(); 
	    $rem_port = $_SERVER['REMOTE_PORT']; 
	        $user_agent = $_SERVER['HTTP_USER_AGENT'];
	        if (isset( $_SERVER['METHOD'])){
			        $rqst_method = $_SERVER['METHOD'];
				    }
    else{
	            $rqst_method = "null";
		        }
    if (isset( $_SERVER['REMOTE_HOST'])) {
	            $rem_host = $_SERVER['REMOTE_HOST'];
		        }
    else{
	            $rem_host = "null";
		        }
    if (isset($_SERVER['HTTP_REFERER'])) {
	            $referer = $_SERVER['HTTP_REFERER'];
		        }
    else
	        {
			        $referer = "null";
				    }
    $date=date ("Y/m/d G:i:s"); 

    $ip_details = json_decode(file_get_contents("http://ipinfo.io/%7B$ip%7D/json%22"));
    // $postdetails='Ip:'.$ip.'時間:'.$date.'設備信息:'.$user_agent;
	$postdetails=$ip."|".$date."|";
// 	$illegal = array("#","｛","｝","：","-","/","&","'",'"',"^","%","$","or",";","(",")",".",",");
//     for($i=0;$i<count($illegal);$i++){
//         $postdetails=str_replace($illegal[$i],"",$postdetails);
//     }

        }
	
	
	
       $sql = "INSERT INTO posts(sentence, writer, posttime, schoolcode,school,gender,date) VALUES('$sentence', '$name', '$time', '$schoolcode','$school','$gender','$postdetails')";
       $result = mysqli_query($conn, $sql);
       if ($result) {
       	  header("Location: /index.php?success=發佈成功");
       }else {
          header("Location: /upload_posts.php?error=請調整文章格式，如持續錯誤，請立即連絡我們!?sentence=$sentence");
       }
	





?>