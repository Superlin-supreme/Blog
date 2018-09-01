<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>上传照片</title>
</head>
<body>
<?php

// header("Content-Type: text/plain;charset=utf-8"); 

//清点当前照片数目
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
// echo $i; 

if($_FILES['file']['error'] > 0){
	echo "Error".$_FILES['file']['error'].'<br>';
}
else{
	echo "Upload: ".$_FILES['file']['name'].'<br>';
	echo "Type:  ".$_FILES['file']['type'].'<br>';
	echo "Size: ".($_FILES['file']['size'] / 1024).'Kb<br>';
		//在服务器上文件的临时副本
	echo "Stored in: ".$_FILES['file']['tmp_name'].'<br>';
	if(file_exists('pic/'.$_FILES['file']['name'])){
		echo $_FILES['file']['name'].' already exists<br>';
	}
	else{
		$i++;
		move_uploaded_file($_FILES['file']['tmp_name'], "pic/".$i.".jpg");
		echo "Stored in: "."pic/".$i.".jpg<br>";
	}
}

?>

<a href="http://localhost:8080/blog/index.html">点击此处返回首页</a>

</body>
</html>