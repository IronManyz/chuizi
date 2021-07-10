<?php
    @include_once("conn.php");
    @include_once("common.php");

    // 谁? 买了什么东西? 买了多少件
    $user = $_POST["user"];
    $gId = $_POST["gId"];
    $buyNum = $_POST["buyNum"];


    if(!($user&&$gId&&$buyNum)){
        paramsErr();
    }

    // 问题
    // 无脑新增  => 用户买过当前商品也会新增 (数据冗余)

    // 解决方法
    // 加入之前,判断 当前用户 是否购买过 该商品?
    // 怎么判断  => 查询  select * from `shoppingcar` where user='a123123' and goodsId= '34043041916'
    $search = "select * from `shopping` where user='$user' and goodsId= '$gId'";
    $result = mysqli_query($conn,$search);
    if(!$result){
        $obj = array();
        $obj["status"] = false;
        $obj["detail"] = "sql语句有误";
        $obj["sql"] = $sql;
        exit(json_encode($obj));
    }

    $item = mysqli_fetch_assoc($result);
    if($item){  // 有数据  => 买过 => 更新
        $sql = "update `shopping` set buyNum=buyNum+ $buyNum  where user='$user' and gId= '$gId";
    }else{ // 没有数据 => 没买过
         // 无脑新增  => 用户买过当前商品也会新增 (数据冗余)
        $sql = "insert into `shopping`(user,gId,buyNum) values('$user','$gId',$buyNum)";
    }


    $bool = mysqli_query($conn,$sql);
    if(!$bool){  //$bool==false 如果sql语句出错  => 阻止脚本继续向后执行
        $obj = array();
        $obj["status"] = false;
        $obj["detail"] = "sql语句有误";
        $obj["sql"] = $sql;
        exit(json_encode($obj));
    }

    $rows = mysqli_affected_rows($conn);
    $obj = array();
    if($rows>0){
        $obj["status"] = true;
        $obj["detail"] = "加入成功";  
    }else{  // $rows == 0
        $obj["status"] = false;
        $obj["detail"] = "数据不存在";  
    }
   
    echo json_encode($obj);

   









?>