<?php
session_start();
require_once "../db_conn.php";


$id=$_SESSION['id'];
$email=$_SESSION['Email'];
$sql = "SELECT * FROM users WHERE id='$id'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$messagelikes=htmlentities($_POST['messagelikes']);
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
		header("Location: http://saylove.cutespirit.org/upload_posts.php?sentence=$sentence?id=$id&alert=姓名未填，請至個人資料頁面設定");
		exit();
	}else if (empty($messagelikes)) {
		header("Location: http://saylove.cutespirit.org/upload_posts.php?sentence=$sentence?id=$id&alert=想說的話未填");
	}else if (empty($postid)) {
		header("Location: http://saylove.cutespirit.org/upload_posts.php?sentence=$sentence?id=$id&alert=錯誤!，未知的學校，請至個人中心重新選取學校或請聯繫管理員");
		exit();
	}else if (empty($school)){
	    header("Location: http://saylove.cutespirit.org/upload_posts.php?sentence=$sentence?id=$id&alert=錯誤!，未知的學校，，請至個人中心重新選取學校請聯繫管理員");
	    exit();
	} 
	{
	   //處理like次數 
       $sqlnum = "SELECT * FROM posts WHERE id='$postid'";
	   $resultnum = mysqli_query($conn, $sqlnum);
	   $rownum = mysqli_fetch_assoc($resultnum);
	   $likes=(int)$rownum['likes']+1;
	   $nolikes=(int)$rownum['likes']-1;
					
					
					
	   //檢查資料庫有無資料
	   $sqlhave = "SELECT * FROM likes WHERE userid='$id' AND postid='$postid'";
	   $resulthave = mysqli_query($conn, $sqlhave);
					
       
      if(mysqli_num_rows($resulthave) == 1){
          $del="DELETE FROM likes WHERE userid='$id' AND postid='$postid'";
          $resultdel = mysqli_query($conn, $del);
          $sqldel = "UPDATE posts            
               SET likes='$nolikes' 
               WHERE id=$postid "; //新增貼文按讚次數//
          $resultdellike = mysqli_query($conn, $sqldel);
      }else
      { 
      $sql666 = "INSERT INTO likes(likes, name, time, school, postid, userid) VALUES('$messagelikes', '$name', '$time', '$school','$postid','$id')"; //記錄使用者按讚//
      $result666 = mysqli_query($conn, $sql666);
       
       
       
       $sql = "UPDATE posts            
               SET likes='$likes' 
               WHERE id=$postid "; //新增貼文按讚次數//
       $result = mysqli_query($conn, $sql);
      }//處理增加按讚的
       
       if ($result) {
       	  header("Location: https://saylove.cutespirit.org/userpost.php/?id=$postid");
       }else {
          header("Location: http://saylove.cutespirit.org/upload_posts.php?sentence=$sentence?id=$id&alert=未知的錯誤，請調整文章格式，如持續錯誤，請立即連絡我們!");
       }
    }





?>