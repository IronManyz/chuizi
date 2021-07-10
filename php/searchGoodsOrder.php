<?php
    @include_once("conn.php");
    @include_once("common.php");

    // 搜索功能
    // 前端传入搜索的关键词  
    
    $key = $_GET["key"];             // key  搜索的关键词 
    $orderCol = $_GET["orderCol"];   // orderCol 排序的列名 (id,goodsName,goodsPrice) 
    $orderType = $_GET["orderType"]; // orderType 排序的方式  asc desc 
    if(!($orderCol&&$orderType)){
        paramsErr();
    }

    // pageIndex   showNum  
    // 第1页  limit 0,10;
    // 第2页  limit 10,10;
    // 第3页  limit 20,10;
    // 第4页  limit 30,10;
    // 第5页  limit 40,10;

    $sql = "select id,goodsId,goodsName,goodsImg,goodsPrice from `goodslist` where goodsName like '%$key%' order by $orderCol $orderType";

    $result = mysqli_query($conn,$sql);

    if(!$result){  // $result==false 如果sql语句出错  => 阻止脚本继续向后执行
        $obj = array();
        $obj["status"] = false;
        $obj["detail"] = "sql语句有误";
        $obj["sql"] = $sql;
        exit(json_encode($obj));
    }
 
    // (2) while()循环解析
    // 解析数据 将数据赋值给变量$item(可以作为循环条件)  每次解析一条, 有数据=> 关联数组, 解析失败=>false  (有数据 循环解析,没有数据就跳出)
    $all = array();
    while($item = mysqli_fetch_assoc($result)){


        array_push($all,$item);
        
    }

    $obj = array();
    if(count($all)){ // len > 0 有数据
        $obj["status"] = true;
        $obj["detail"] = "success!";
        $obj["list"] = $all;
    }else{
        $obj["status"] = false;
        $obj["detail"] = "fail!";
    }
    echo json_encode($obj);







?>