<?php

//清点当前照片数目

header("Content-Type: text/plain;charset=utf-8"); 

$dir='pic';  
$handle=opendir($dir);  
$i=0;  
while(false!==($file=readdir($handle))){  
    if($file!='.' && $file!='..'){  
        // var_dump($file);  
        $i++;  
    }  
}  
closedir($handle);  

echo '{"success":true,"msg":"' . $i . '"}'; 

?>