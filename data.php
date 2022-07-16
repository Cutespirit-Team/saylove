<?php
file_put_contents("test.csv", file_get_contents("https://docs.google.com/spreadsheet/ccc?key=1Qfnv_rPduClJNAs4RZXcnLoLNGBfGOvMXZy10aNi_gk&output=csv"));
?>
<?php
header("Location: /dataaaa/index.php")
?>