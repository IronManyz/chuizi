<?php
    @include_once("conn.php");
    @include_once("common.php");

    // 搜索功能
    // 前端传入搜索的关键词  

    $key = $_GET["key"];   // 
    // if(!($key)){
    //     paramsErr();
    // }

    $sql = "select id,goodsId,goodsName,goodsImg,goodsPrice from `goodslist` where goodsName like '%$key%'";

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

        // 数据预处理 (将数据返回前端之前  提前做的一些处理)
        $item["chinese"] = $item["chinese"]*1;
        $item["math"] = $item["math"]*1;
        $item["english"] = $item["english"]*1;
        $item["total"] = $item["total"]*1;

        array_push($all,$item);
        // print_r($item);
        // echo "<br>";
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