

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

                // if (trim($row['school']) == $schoolCodeArr[$i][1]){
                    
                    
                    // echo '<option selected value="'.$schoolCodeArr[$i][1].'"  >'.$schoolCodeArr[$i][0].'</option>';
                    
                // }
                
            }
    }
    ?>