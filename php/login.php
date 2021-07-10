<?php
    @include_once("conn.php");
    @include_once("common.php");

    // 登录流程 
    // 前端传入的用户名和密码    和  数据库中存储的 用户名和密码 做对比

    // 前端传入的用户名和密码 
    // $user = "a123123";
    // $pwd = "12312311";

    $user = $_POST["user"];
    $pwd = $_POST["pwd"];
    if(!($user&&$pwd)){
        paramsErr();
    }


    // 数据库中存储的 用户名和密码 如何查找? 
    // 对应用户名查找  找到 => 对比密码
    //                找不到 => 该用户未注册

    $sql = "select * from `userinfo` where user = '$user'";
    
    $result = mysqli_query($conn,$sql);

    if(!$result){  // $result==false 如果sql语句出错  => 阻止脚本继续向后执行
        $obj = array();
        $obj["status"] = false;
        $obj["detail"] = "sql语句有误";
        $obj["sql"] = $sql;
        exit(json_encode($obj));
    }
    // mysqli_fetch_assoc($result)  传入一个结果对象解析数据  解析成功=>返回解析的数据(数组 关联数组)   解析失败 => false  
    // 注意 每次只能解析一条

    // $item = mysqli_fetch_array($result);
    $item = mysqli_fetch_assoc($result);  // 查询的数据
    // print_r($item);

    $obj = array();
    if($item){ // 有数据 => 存在该用户
        // 对比密码  用户输入的 和 数据库存储的
        if($pwd == $item["pwd"]){
            $obj["status"] = true;
            $obj["detail"] = "登录成功";
           
        }else{
            $obj["status"] = false;
            $obj["detail"] = "用户名或密码有误";
        }
    }else{
        $obj["status"] = false;
        $obj["detail"] = "该用户未注册";
    }
    echo json_encode($obj);
?>  
