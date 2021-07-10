<?php
    @include_once("conn.php");  
    @include_once("common.php");  

    // 接收前端传入的数据 (对应字段名接收)

    $pwd = $_POST["pwd"];
    $phone = $_POST["phone"];

    if(!($pwd&&$phone)){
        paramsErr();
    }

    $sql = "insert into `userinfo`(pwd,phone) values('$pwd','$phone')";

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
    $obj["detail"] = "注册成功";

    echo json_encode($obj);



?>
