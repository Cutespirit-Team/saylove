

<?php
//error_reporting(E_ALL); 
//ini_set("display_errors", 1);
$email=$_POST['email'];
$otp = strval(rand(100000,999999));
require_once "../db_conn.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once "../PHPmailer/PHPMailer.php";
require_once "../PHPmailer/SMTP.php";
require_once "../PHPmailer/Exception.php";

$mail = new PHPMailer();
//smtp settings
//$mail->SMTPDebug = SMTP::DEBUG_SERVER;
//$mail->SMTPDebug = 4; //Alternative to above constant
$mail->CharSet = 'UTF-8';
$mail->isSMTP();
$mail->Host = "smtp.gmail.com";
$mail->SMTPAuth = true;
$mail->Username = "";
$mail->Password = '';
$mail->Port = 587;
$mail->SMTPSecure = "tls";
//email settings
$mail->isHTML(true);
$mail->setFrom("此填發件信箱", "全國高中告白系統");
$mail->addAddress($email);
$mail->Subject = ("驗證碼");
$mail->Body = ('您的驗證碼為:'.$otp);

if($mail->send()){
    $sql = "UPDATE users SET forgotpassverifycode = '$otp' WHERE Email = '$email'";
    mysqli_query($conn,$sql);
    echo mysqli_error($conn);
    header("Location: ../forgotpassverify.php");
} 
?>
