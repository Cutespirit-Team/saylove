<?php

$sname= "127.0.0.1";
$unmae= "saylove";
$password = "asdf123456@@@";
$db_name = "saylove";

$conn = mysqli_connect($sname, $unmae, $password, $db_name);
if (!$conn) {
	echo "連線錯誤";
}