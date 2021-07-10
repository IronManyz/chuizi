<?php
    @include_once("conn.php");  
    @include_once("common.php");  

    // 前端传入的用户名
    $user = $_GET["user"];
    if(!$user){
        paramsErr();
    }

    $sql = "select * from `userinfo` where user = '$user'";

    $result = mysqli_query($conn,$sql);
    // print_r($result);

    if(!$result){  // $result==false 如果sql语句出错  => 阻止脚本继续向后执行
        $obj = array();
        $obj["status"] = false;
        $obj["detail"] = "sql语句有误";
        $obj["sql"] = $sql;
        exit(json_encode($obj));
    }
    // mysqli_fetch_assoc($result)  传入一个结果对象 解析成功=>返回解析的数据(数组 关联数组)   解析失败 => false  
    // 注意 每次只能解析一条

    // $item = mysqli_fetch_array($result);
    $item = mysqli_fetch_assoc($result);
    // print_r($item);

    $obj = array();
    if(!$item){ // 没有数据
        $obj["status"] = true;
        $obj["detail"] = "可以使用的用户名!";
    }else{ //有数据
        $obj["status"] = false;
        $obj["detail"] = "该用户已注册!";
    }
    echo json_encode($obj);



?>
