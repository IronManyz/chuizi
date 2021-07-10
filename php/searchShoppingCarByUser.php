<?php
    @include_once("conn.php");
    @include_once("common.php");

    $user = $_POST["user"];
    if(!$user){
        paramsErr();
    }

    $sql = "select s.id,s.gId,g.goodsName,g.goodsImg,g.goodsPrice,s.buyNum from `shoppingcar` as s,`goodslist` as g where s.gId = g.goodsId and s.user = '$user'";

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

    // PHP number_format() 函数
    // number_format()：函数可以通过千位分组的形式来格式化数字。

    // 语法：
    // number_format(number,decimals,decimalpoint,separator)

    // 参数：
    // number：必需。要格式化的数字。
    // decimals：可选。规定多少个小数。
    // decimalpoint：可选。规定用作小数点的字符串。
    // separator：可选。规定用作千位分隔符的字符串。


    $all = array();
    while($item = mysqli_fetch_assoc($result)){
        
        // 数据预处理 (将数据返回前端之前  提前做的一些处理)
        // number_format($num, 2)
        $item["total"] = number_format($item["goodsPrice"]*$item["buyNum"],2,".","");
     

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