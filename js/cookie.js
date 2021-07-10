//多参数传参 (参数一一对应)
function setCookie(key, val, day, path = "/") {
    if (day) {
        var date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = key + "=" + encodeURIComponent(val) + ";expires=" + date.toUTCString() + ";path=" + path;
    } else {
        document.cookie = key + "=" + encodeURIComponent(val) + ";path=" + path;
    }
}

function getCookie(key) {  // 用户传入
    var cookie = document.cookie;
    if (cookie) {
        var arr = cookie.split("; ");
        // console.log(arr);
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];  // "user=a123123", "pwd=123123", "phone=12313212311"
            // 拆分的每一个
            var attr = item.split("=")[0]; // "user"  "pwd" "phone"
            var val = item.split("=")[1];
            if (key === attr) {
                return decodeURIComponent(val);
            }
        }
    }
    return "";
}


// 删除 
function delCookie(key) {
    setCookie(key, "", -1);
}

// 对象 => 排名不分先后 , 参数可以省略(有默认值)
// setCookie({ key: "user", val: "a123123" })
// function setCookie(options) {  // {key,val,day,path}
//     var { key, val, expires, path = "/" } = options;
//     if (expires) {
//         var date = new Date();
//         date.setSecond(date.getSecond() + expires);
//         document.cookie = key + "=" + val + ";expires=" + date.toUTCString() + ";path=" + path;
//     } else {
//         document.cookie = key + "=" + val + ";path=" + path;
//     }
// }


function urlParse() {
    var search = location.search;
    var str = search.substring(1);  //字符串裁切  去 ?  => user=a123123&pwd=123123&phone=17386141517&
    var list = str.split("&");   //   ["user=a123123", "pwd=123123", "phone=17386141517", 
    var data = {};
    for (var i = 0; i < list.length; i++) { // 遍历数组中的每一条进行二次拆分
        var item = list[i];            //"user=a123123", "pwd=123123", "phone=17386141517", 
        var key = item.split("=")[0];  // "user"  "pwd" "phone"
        var val = item.split("=")[1];  // "a123123" 123123
        data[key] = decodeURIComponent(val);  // url中的数据可能有中文和特殊字符(默认会被编码)  => 解码
    }

    return data;
}