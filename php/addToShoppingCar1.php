<?php
    @include_once("conn.php");
    @include_once("common.php");

    // 谁? 买了什么东西? 买了多少件

    // 问题
    // 无脑新增  => 用户买过当前商品也会新增 (数据冗余)

    // 加入之前,判断 当前用户 是否购买过 该商品

    // 无脑新增  => 用户买过当前商品也会新增 (数据冗余)
    $sql = "insert into `shoppingcar`(user,gId,buyNum) values('a123123','34043041916',1)";

    $bool = mysqli_query($conn,$sql);

    if(!$bool){  //$bool==false 如果sql语句出错  => 阻止脚本继续向后执行
        $obj = array();
        $obj["status"] = false;
        $obj["detail"] = "sql语句有误";
        $obj["sql"] = $sql;
        exit(json_encode($obj));
    }

    // mysqli_affected_rows($conn)  // 传入一个mysql连接对象$conn 返回受影响的行数
    // row >    0  新增成功
    // row ==  -1  新增失败 sql语句有误
    $rows = mysqli_affected_rows($conn);

    $obj = array();
    $obj["status"] = true;
    $obj["detail"] = "加入成功";

    echo json_encode($obj);









?>