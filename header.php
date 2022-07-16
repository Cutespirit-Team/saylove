<?php
ini_set('session.cookie_path', '/');
ini_set('session.cookie_domain', '.cutespirit.org');
ini_set('session.cookie_lifetime', '1800');
session_start();
$posts ="posts";
$logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXvULoFolp4jwZexrlX9kSI-0ovS1jNpGNzw&usqp=CAU";
$home="http://saylove.cutespirit.org/";
$login="http://saylove.cutespirit.org/login.php";
$id='0';
$post="posts.php?school=";
require_once "db_conn.php";
//require_once "php/read.php";
if (isset($_SESSION['id']) and isset($_SESSION['Email'])){
    $id = $_SESSION['id'];
    $email = $_SESSION['Email'];
   
}
$sql = "SELECT * FROM users WHERE id='$id'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);

?>
    
<!DOCTYPE html>
<html lang="en">
    
	<head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"> 
        <meta charset="utf-8">
        <title>全國高中告白牆</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <link href="/bootstrap.css" rel="stylesheet">
        <link href="/style.css" rel="stylesheet">
        <script src="cutegirl.js"></script>
        
        <link rel="stylesheet" href="/notice/css/style.css">
        <link rel="stylesheet" href="/notice/dist/notice.min.css">
        <link rel="stylesheet"
          href="/notice/css/default.min.css">
        
    </head>
    <body>
  
        <div class="wrapper">
			<div class="box">
				<div class="row row-offcanvas row-offcanvas-left">
					
					<!-- sidebar -->
					<div class="column col-sm-2 col-xs-1 sidebar-offcanvas" id="sidebar">
					  
						<ul class="nav">
							<li><a href="#" data-toggle="offcanvas" class="visible-xs text-center"><i class="glyphicon glyphicon-chevron-right"></i></a></li>
						</ul>
					   
						<ul class="nav hidden-xs" id="lg-menu">
							<li class="active"><a href="#featured"><i class="glyphicon glyphicon-list-alt"></i>哈密瓜好帥</li>
							<li><a href="#stories"><i class="glyphicon glyphicon-list"></i> 哈密瓜好</a></li>
							<li><a href="#"><i class="glyphicon glyphicon-paperclip"></i> 哈密瓜好</a></li>
							<li><a href="#"><i class="glyphicon glyphicon-refresh"></i> 哈密瓜好</a></li>
						</ul>
					
					  
						<!-- tiny only nav-->
					  <ul class="nav visible-xs" id="xs-menu">
							<li><a href="#featured" class="text-center"><i class="glyphicon glyphicon-list-alt"></i></a></li>
							<li><a href="#stories" class="text-center"><i class="glyphicon glyphicon-list"></i></a></li>
							<li><a href="#" class="text-center"><i class="glyphicon glyphicon-paperclip"></i></a></li>
							<li><a href="#" class="text-center"><i class="glyphicon glyphicon-refresh"></i></a></li>
						</ul>
					  
					</div>
					<!-- /sidebar -->
				  
					<!-- main right col -->
					<div class="column col-sm-10 col-xs-11" id="main">
						
						<!-- top nav -->
						<div class="navbar navbar-blue navbar-static-top">  
							<div class="navbar-header">
							  <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
								<span class="sr-only">Toggle</span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							  </button>
							  <div class="tittleimg">
							  <a href="http://saylove.cutespirit.org/">
							  <img src="/img/-1.svg" width="250px"> 
							  </a>
							  </div>
							</div>
							<nav class="collapse navbar-collapse" role="navigation">
			
							    
							    
							    
							    
							<nav class="collapse navbar-collapse" role="navigation">
							<form class="navbar-form navbar-left">
							<div class="input-group input-group-sm" style="max-width:360px;">
						<link rel="stylesheet" href="/search.css">
                        <script src="https://kit.fontawesome.com/a076d05399.js"></script>
                         <div class="wrapper" style="float:right;">
                           <div class="search-input">
                             <a href="" target="_blank" hidden></a>
                             <input type="text" placeholder="搜尋您的高中...">
                             <div class="autocom-box">
                             </div>
                             <div class="icon"><i class="fas fa-search"></i></div>
                             <script src="/search.js"></script>
                           </div>
                         </div>
								  <div class="input-group-btn">
									
								  </div>
								</div>
								
							</form>
							      <?php
    $file_path = "school/school.csv"; //檔案名稱
    if(file_exists($file_path)){ //檔案是否存在
            $fp = fopen($file_path,"r"); //檔案以唯獨開啟
            $str = "";
             $arr = array();//陣列
            while(!feof($fp)){
                    $str = explode("\n", fgets($fp));
                    array_push($arr,$str);
                    //丟進去陣列
            }
            $schoolCodeArr=array();
            for ($i=0;$i<count($arr);$i++){
              $schoolInfoStr= explode(",", $arr[$i][0]);
              array_push($schoolCodeArr,$schoolInfoStr);
            }
            echo "<script>let suggestions = [";
            for ($i = 0;$i<count($arr);$i++){
                if($i==count($arr)-1){
                    echo '"'.$schoolCodeArr[$i][0].'"';
                }else{
                    echo '"'.$schoolCodeArr[$i][0].'",';
                }
                
            }
               
                
            
            }
            echo "];</script>";  
            
    
    ?>
							
							
							
							
							
							
							<ul class="nav navbar-nav">
							  <li>
								<a href="http://saylove.cutespirit.org/"><i class="glyphicon glyphicon-home"></i> 首頁</a>
							  </li>
							  <li>
							 <li><?
								if (isset($_SESSION['id']) and isset($_SESSION['Email'])){ }else{echo "<li><a href='/login.php'>登入</a></li>";}
								?>
							  </li>
							  <li><?
								if (isset($_SESSION['id']) and isset($_SESSION['Email'])){echo "<li><a href='/profiles.php'>個人資料</a></li>";}
								?>
							  <li>
							      <?php
							      if (isset($_SESSION['id']) and isset($_SESSION['Email'])){echo "
								<a href='/upload_posts.php' role='button' data-toggle='modal'><i class='glyphicon glyphicon-plus'></i> 新增貼文</a>";}
								?>
							  </li>
							   <li><?
								if (!empty($row['identity']) and$row['identity']=="admin"){echo "<li><a href='/manage.php'>管理中心</a></li>";}
								?>
							  <li>
							  <li><?
								if (isset($_SESSION['id']) and isset($_SESSION['Email'])){echo "<li><a href='/logout.php'>登出</a></li>";}
								?>
							</ul>
							
							</nav>
						</div>
						
						<!-- /top nav -->