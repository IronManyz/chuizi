<?php
    @include_once("conn.php");
    @include_once("common.php");
    
    @header("content-type:text/json;charset=utf-8");  // 数据以json形式返回

    // 搜索功能
    // 前端传入搜索的关键词  

    $gid = $_GET["gid"];   // 
    if(!($gid)){
        paramsErr();
    }

    $sql = "select * from `goodslist` where goodsId = '$gid'";

    $result = mysqli_query($conn,$sql);

    if(!$result){  // $result==false 如果sql语句出错  => 阻止脚本继续向后执行
        $obj = array();
        $obj["status"] = false;
        $obj["detail"] = "sql语句有误";
        $obj["sql"] = $sql;
        exit(json_encode($obj));
    }
 
    $item = mysqli_fetch_assoc($result);

    $item["bigPicList"] = explode(",",$item["bigPicList"]);
    $item["smallPicList"] = explode(",",$item["smallPicList"]);

    $obj = array();
    if($item){ // 有数据
        $obj["status"] = true;
        $obj["detail"] = "success!";
        $obj["data"] =$item;
    }else{
        $obj["status"] = false;
        $obj["detail"] = "fail!";
    }
    echo json_encode($obj);



?>