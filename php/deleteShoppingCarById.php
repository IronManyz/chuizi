<?php
    @header("content-type:text/html;charset=utf-8");

    @include_once("conn.php");
    @include_once("common.php");

    $id = $_GET["id"];
    $user=$_GET["user"];
    if(!$id){  // 没有参数就报错
        paramsErr();
    }


    // $del = "delete from `grade` where id = $id"; // 单删
    $del = "delete from `shoppingcar` where gid='$id' and user='$user'"; // 多删 (传多个 逗号分隔)

    // mysqli_query($conn,sql)  执行传入的sql语句
    // $conn  连接对象
    // sql    执行的语句

    // 增删改 
    // 语句执行成功 => true  语句执行失败=>false

    $bool = mysqli_query($conn,$del);
    if(!$bool){  //$bool==false 如果sql语句出错  => 阻止脚本继续向后执行
        $obj = array();
        $obj["status"] = false;
        $obj["detail"] = "sql语句有误";
        $obj["sql"] = $del;
        exit(json_encode($obj));
    }

   
    // 删除
    // mysqli_affected_rows($conn)  // 传入一个mysql连接对象$conn 返回受影响的行数
    // row >    0  删除成功
    // row ==   0  语句执行成功 数据未改变 (不存在改数据)
    // row ==  -1  删除失败 sql语句有误
    $rows = mysqli_affected_rows($conn);

    $obj = array();
    if($rows>0){
        $obj["status"] = true;
        $obj["detail"] = "删除成功";
    }else{
        $obj["status"] = false;
        $obj["detail"] = "删除失败,数据不存在!";
    }
    echo json_encode($obj);

?>