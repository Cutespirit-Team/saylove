<?php
session_start();
session_unset();
session_destroy();
header("Location: index.php?success=η»εΊζε!");
?>