<?php
session_start();
if(isset($_SESSION['id']) and isset($_SESSION['Email'])){}else{
    header("Location: /login.php");
    exit();
}
?>
<?php
if(isset($_GET['error'])){
$errornotice=htmlentities($_GET['error']);
}
if(isset($_GET['success'])){
$successnotice=htmlentities($_GET['success']);
}

?>

<?php  require("header.php");?>
 <script src="notice/js/highlight.min.js"></script>
    <script>
        hljs.highlightAll();
    </script>

    <script src="notice/dist/notice.min.js"></script>
    <script>
        const notice = new Notice();
    </script>

    <script src="notice/js/main.js"></script>

<div class="padding">
<div class="full col-sm-9">
<!-- content -->                      
<div class="row">
							  
<!-- main col left --> 
<div class="col-sm-5">

    <section class="home">
        <div id="login" class="text">
            <?php 
                if(mysqli_num_rows($result)==0){echo "您尚未登入優";}
                if(mysqli_num_rows($result)==1){echo $row['name']."，網站尚在建置中!";}
                ?>
                <?php
require_once "db_conn.php";
$id=$_SESSION['id'];
$email=$_SESSION['Email'];

$sql3 = "SELECT * FROM users WHERE Email='$email' AND id='$id'";
$result3 = mysqli_query($conn, $sql3);
$rows = mysqli_fetch_assoc($result3);
if (mysqli_num_rows($result3) == 0) {
	echo "沒有您的資料，請聯繫管理員";
	
}
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
            for ($i = 0;$i<count($arr);$i++){
                if (trim($row['school']) == $schoolCodeArr[$i][1] ){
                    $pageschool=$schoolCodeArr[$i][0];//轉換為學校//
                   
                }
                
            }
    }
?>
	<div class="container">
		<form action="php/updateposts.php" 
		      method="post">
		   <h4 class="pgtitle">新增貼文</h4><hr><br>
		   <?php if (isset($_GET['alert'])) { ?>
		   <div class="alert alert-danger" role="alert">
			  <?php echo $_GET['alert']; ?>
			  

		    </div>
		   <?php } ?>
		   <div class="form-group">
		     <label for="name">您的姓名</label>
		     <input type="text" 
		           class="form-control" 
		           id="name" 
		           name="name" 
				   required="required"
		           value="<?=$row['name'] ?>" readonly  unselectable="on"/ >
		   </div>
		   
		     <div class="form-group">
		  <?php for ($i = 0;$i<count($arr);$i++){
                if (trim($row['school']) == $schoolCodeArr[$i][0]){
                    $pageschool=$schoolCodeArr[$i][0];//轉換為學校代碼//
                  
                    }
                    } 
                    
            ?>
		         
		     <label for="school">發布學校</label>
		     <input type="text" 
		           class="form-control" 
		           id="school" 
		           name="school" 
				   required="required"
		           value="<?php echo $pageschool; ?>" readonly  unselectable="on"/ >
		           <?php 
    if(empty($pageschool)){
    $url = "/profiles.php?error=請先選擇學校";
    echo "<script type='text/javascript'>";
    echo "window.location.href='$url'";
    echo "</script>"; 
    };
    ?>
		   </div>

		   <div class="form-group">
		     <label for="sentence">想說的話</label>
		     <input type="text" 
		           class="form-control" 
		           id="sentence" 
		           name="sentence" 
		           value="<?php if(!empty($_GET['sentence'])){echo $_GET['sentence'];} ?>"
				   required="required"
		            >
		   </div>
		   <input type="text" 
		          id="schoolcode"
		          name="schoolcode"
		          value="<?=$rows['school']?>"
		          hidden >
		          
		     <input type="text" 
		          id="school"
		          name="school"
		          value="<? echo $pageschool ?>"
		          hidden >

		   <button type="submit" 
		           class="btn btn-primary"
		           name="update">發布</button>
		    
	    </form>
	     <script>
    if("<?php echo $errornotice ;?>" != ""){
        notice.showToast({
        text: '<?php echo $errornotice;?>',
        type: 'warning'
        });
    }
                
    </script> 
	</div>
  </div>
		 </div>
		
     
     <?php  require("footer.php");?>