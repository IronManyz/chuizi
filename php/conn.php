<?php
    @header("content-type:text/html;charset=utf-8");
	// 允许所有源访问   配置CORS
	@header("Access-Control-Allow-Origin:*");
	// @header("Access-Control-Allow-Origin:http://127.0.0.1:5500");
	// @header("Access-Control-Allow-Origin:http://192.168.59.115");
	

    // const host = "b-ro9uz8lpcjnqpj.bch.rds.gz.baidubce.com";
    // const user = "b_ro9uz8lpcjnqpj";
    // const pwd = "12345678";
    // const dbName = "b_ro9uz8lpcjnqpj";



    const host = "localhost:3306";
    const user = "root";
    const pwd = "root";
    const dbName = "2105";

    // 3. 连接mysql 选择数据库
    //  简化1,2  合二为一,一步到位
    // 连接成功 返回连接对象, 连接失败会报错返回false
    $conn = mysqli_connect(host,user,pwd,dbName);
    // print_r($conn)
    if(!$conn){ //$conn == false
        $obj = array();
        $obj["status"] = false;
        $obj["detail"] = "数据库连接失败";
        exit(json_encode($obj));
    }

    // 兼容低版本(转码设置)
    mysqli_query($conn,"set names utf8"); // 从数据库取数据时  将编码转为utf-8;  
    mysqli_query($conn,"set character set utf-8"); // 向数据库存数据时  将编码转为utf-8

    // mysqli_query($conn,sql)  执行传入的sql语句
    // $conn  连接对象
    // sql    执行的语句

    // 仅允许自己访问  如果不是,阻止脚本继续向后执行
    // if(!($_SERVER["REMOTE_ADDR"]=="::1"||$_SERVER["REMOTE_ADDR"]=="192.168.59.21")){
    //     exit("你在想啥呢!");  // 终止脚本执行
    // }
?>