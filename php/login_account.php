<?php
    @include_once("conn.php");
    @include_once("common.php");

    // 登录流程 
    // 前端传入的账号和密码    和  数据库中存储的 账号和密码 做对比

    // 前端传入的账号(用户名 手机号 邮箱)和密码 
    // $account = "a123123";  // 17386141517 1272071496@qq.com
    // $pwd = "12312311";

    $account = $_POST["account"];  //账号(用户名 手机号 邮箱)
    $pwd = $_POST["pwd"];
    if(!($account&&$pwd)){
        paramsErr();
    }

    // 数据库中存储的账号(用户名 手机号 邮箱)和密码 如何查找? 
    // 对应(用户名 手机号 邮箱)查找  找到 => 对比密码
    //                             找不到 => 该用户未注册

    $sql = "select * from `userinfo` where user = '$account' or phone = '$account' ";
    
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
            $obj["phone"] = $item["phone"];

            // 后端直接存储cookie lgc标识用户身份
            // setcookie("lgc",$item["user"],time()+60*60*24*7,"/");
        }else{
            $obj["status"] = false;
            $obj["detail"] = "账号或密码有误";
        }
    }else{
        $obj["status"] = false;
        $obj["detail"] = "该账号未注册";
    }
    echo json_encode($obj);
?>  
