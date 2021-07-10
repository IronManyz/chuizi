// 接口

// 对ajax进行二次封装 (发送ajax请求  返回Promise实例)
function request(url, data = "", type = "get") {
    return new Promise(function (resolve) {
        // debugger;
        $.ajax({
            type,
            url,
            data,
            dataType: "json",
            success: function (result) {
                // 请求成功  => 改变Promise状态 => 将数据存储到Promise实例
                resolve(result);
            }

        })
    });
}


// params 传一个对象作为参数
const isExistUser = params => request("../php/isExistUser.php", params, "get");
const isExistPhone = params => request("../php/isExistPhone.php", params, "get");
const isExistEmail = params => request("../php/isExistEmail.php", params, "get");
const register = params => request("../php/register.php", params, "post");

const login = params => request("../php/login.php", params, "post");

// 商品列表
const searchGoodsOrderLimit = params => request("../php/searchGoodsOrderLimit.php", params);

// 详情页
const searchGoodsByGoodsId = params => request("../php/searchGoodsByGoodsId.php", params);
const addToShoppingCar = params => request("../php/addToShoppingCar.php", params, "post");

// 购物车
const searchShoppingCarByUser = params => request("../php/searchShoppingCarByUser.php", params, "post");





