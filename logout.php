<?php
session_start();
session_unset();
session_destroy();
header("Location: index.php?success=登出成功!");
?>