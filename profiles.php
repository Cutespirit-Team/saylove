<?php  
session_start();
if(isset($_SESSION['id']) and isset($_SESSION['Email'])){}else{
    header("Location: /login.php");
    exit();
}
require("header.php");?>
    <section class="home">
        <div id="login" class="text">
            <script src="script.js"></script>
            
        <?php
require_once "db_conn.php";
$id=$_SESSION['id'];
$email=$_SESSION['Email'];
if(isset($_GET['error'])){
$errornotice=htmlentities($_GET['error']);
}
if(isset($_GET['success'])){
$successnotice=htmlentities($_GET['success']);
}

$sql3 = "SELECT * FROM users WHERE Email='$email' AND id='$id'";
$result3 = mysqli_query($conn, $sql3);
$rows = mysqli_fetch_assoc($result3);
if (mysqli_num_rows($result3) == 0) {
	echo "沒有您的資料，請聯繫管理員";
	
}


?>

<script src="notice/js/highlight.min.js"></script>
<script>
    hljs.highlightAll();
</script>

<script src="notice/dist/notice.min.js"></script>
<script>
    const notice = new Notice();
</script>

<script src="notice/js/main.js"></script>
<script>
if("<?php echo $errornotice ;?>" != ""){
    notice.showToast({
    text: '<?php echo $errornotice;?>',
    type: 'warning'
    });
}

</script> 
<script>
if("<?php echo $successnotice ;?>" != ""){
    notice.showToast({
    text: '<?php echo $successnotice;?>',
    type: 'success'
    });
}
</script>
<div class="padding">
<div class="full col-sm-9">
<!-- content -->                      
<div class="row">
							  
<!-- main col left --> 
<div class="col-sm-5">


	<div class="container">
		<form action="php/updateprofiles.php" 
		      method="post">
            
		   <h4 class="pgtitle">個人資料</h4><hr><br>
		   <?php if (isset($_GET['error'])) { ?>
		   <div class="alert alert-danger" role="alert">
			  <?php echo $_GET['error']; ?>
		    </div>
		   <?php } ?>
		   <div class="form-group">
		     <label for="name">姓名</label>
		     <input type="name" 
		           class="label_name"
		           id="name" 
		           name="name" 
				   required="required"
		           value="<?=$row['name'] ?>" >
		   </div>

		   <div class="form-group">
		     <label for="email">電子郵件</label>
		     <input type="email" 
		           class="label_name" 
		           id="email" 
		           name="email" 
				   required="required"
		           value="<?=$row['Email'] ?>"readonly  unselectable="on"/ >
		   </div>

           
           
          <div class="form-group">
           <label>性別:
          <select name="gender" id="gender" required="required" class="selector">
          <option value="0" selected>請選擇性別</option>
          <?php
          if ($row['gender'] == "男"){
                  echo "<option value='男' selected='selected'>男</option>";
                  echo "<option value='女' >女</option>";
          } else if ($row['gender'] == "女"){
            echo"<option value='女' selected='selected'>女</option>";
            echo"<option value='男' >男</option>";
          } else {
              echo "<option value='男'>男</option>";
              echo "<option value='女'>女</option>";
          }
          ?>
          </select>
           </div>
           
    
           
    <div class="form-group">
           <label class="label_name" >高中:
          <select name="school" id="school" required="required" class="selector">
          <option value="0" selected>請選擇高中</option> 
          
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
            for ($i = 0;$i<count($arr);$i++){
                echo '<option value="'.$schoolCodeArr[$i][1].'" >'.$schoolCodeArr[$i][0].'</option>';

                if (trim($row['school']) == $schoolCodeArr[$i][1]){
                    
                    
                    echo '<option selected value="'.$schoolCodeArr[$i][1].'"  >'.$schoolCodeArr[$i][0].'</option>';
                    
                }
                
            }
    }
    ?>



		   <input type="text" 
		          name="id"
		          value="<?=$row['id']?>"
		          hidden >

		   <button type="submit" 
		           class="btn btn-primary"
		           name="update">更新以上資料</button>
		    
	    </form>
	</div>
	
	
	<form action="change-p.php" method="post">
     	<h2 class="sub_title">變更密碼</h2>
     	<?php if (isset($_GET['error'])) { ?>
     		<p class="error"><?php echo $_GET['error']; ?></p>
     	<?php } ?>

     	<?php if (isset($_GET['success'])) { ?>
            <p class="success"><?php echo $_GET['success']; ?></p>
        <?php } ?>
        <div class="form-group">
     	<label>舊密碼</label>
     	<input type="password" 
     	       class="label_name"
     	       name="op" 
     	       placeholder="Old Password">
     	       </div>
        <div class="form-group">
     	<label>新密碼</label>
     	<input type="password" 
     	        class="label_name"
     	       name="np" 
     	       placeholder="New Password">
     	       </div>
<div class="form-group">
     	<label>確認新密碼</label>
     	<input type="password" 
     	        class="label_name" 
     	       name="c_np" 
     	       placeholder="Confirm New Password">
     	       </div>

     	<button type="submit" 
		           class="btn btn-primary"
		           name="change-p">變更密碼</button>
		 </div>
		 </div>
		
     </form>
     <?php  require("footer.php");?>