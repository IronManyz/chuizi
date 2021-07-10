<?php
    @include_once("conn.php");
    @include_once("common.php");

    // 搜索功能
    // 前端传入搜索的关键词  
    
    $key = $_GET["key"];             // key  搜索的关键词 
    $orderCol = $_GET["orderCol"];   // orderCol 排序的列名 (id,goodsName,goodsPrice) 
    $orderType = $_GET["orderType"]; // orderType 排序的方式  asc desc 
    $pageIndex = $_GET["pageIndex"]; // pageIndex 页码(第几页)
    $showNum = $_GET["showNum"]; // pageIndex 每页显示多少条

    if(!($orderCol&&$orderType)){
        paramsErr();
    }

    
    // 分页
    // pageIndex(页码)   showNum(每页显示多少条)  
    // 第1页  limit 0,10;
    // 第2页  limit 10,10;
    // 第3页  limit 20,10;
    // 第4页  limit 30,10;
    // 第5页  limit 40,10;
    
    // 规律   limit  (pageIndex-1)*showNum , showNum


    // 问题?  数据数量有限,pageIndex有可能超出临界值  小于最小值(1)  大于最大值

    // 解决方法 => 范围限制  
    // 最小值 (1)   
    
    // 最大值   
    // 总数据(477) / 每页显示多少条(10)   => 向上取值 (48)
    // 总数据(477) / 每页显示多少条(20)   => 向上取值 (24)
    
    // 怎么找 满足条件的总数据?
    // select count(*) from `goodslist` where goodsName like '%$key%'
    $searchAll = "select count(*) as total from `goodslist` where goodsName like '%$key%'";
    $resultAll = mysqli_query($conn,$searchAll);
    if(!$resultAll){  // $result==false 如果sql语句出错  => 阻止脚本继续向后执行
        $obj = array();
        $obj["status"] = false;
        $obj["detail"] = "sql语句有误";
        $obj["sql"] = $searchAll;
        exit(json_encode($obj));
    }

    $item = mysqli_fetch_assoc($resultAll);
    // print_r($item);

    $total = $item["total"]; // 满足条件的总数据

    if($total==0){   // 如果查询数据为0
        $obj = array();
        $obj["status"] = false;
        $obj["detail"] = "暂无数据";
        $obj["sql"] = $searchAll;
        exit(json_encode($obj));
    }

    $maxPage = ceil($total/$showNum);

    if($pageIndex>$maxPage){
        $pageIndex = $maxPage;
    }

    
    if($pageIndex<1){
        $pageIndex = 1;
    }

    $skipNum = ($pageIndex-1)*$showNum;

    $sql = "select id,goodsId,goodsName,goodsImg,goodsPrice from `goodslist` where goodsName like '%$key%' order by $orderCol $orderType limit $skipNum,$showNum";

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
        $obj["total"] = $total;
        $obj["maxPage"] = $maxPage;
        $obj["list"] = $all;
    }else{
        $obj["status"] = false;
        $obj["detail"] = "fail!";
    }
    echo json_encode($obj);

?>