<?php

$sname= "127.0.0.1";
$unmae= "";
$password = "";
$db_name = "";

$conn = mysqli_connect($sname, $unmae, $password, $db_name);
if (!$conn) {
	echo "連線錯誤";
}