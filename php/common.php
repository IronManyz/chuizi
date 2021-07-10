<?php
    @header("content-type:text/html;charset=utf-8");

    function paramsErr($status=false,$detail="请传入完整参数"){
        $obj = array();
        $obj["status"] = $status;  
        $obj["detail"] = $detail;
        exit(json_encode($obj));
    }
?>