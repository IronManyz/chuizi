$(function () {


    //标识用户信息
    // debugger;
    // var tips = $(".top_user").get(0);
    var user = getCookie("lgc");
    var html = "";
    if (user) {

        console.log($(".top_user"));
        html = `
        <button onclick="exit()">退</button>
        <a href="../html/goodsList.html" > <img src="../images/register/32.jpg" alt=""></a>
        <a href="../html/goodsCer.html"> <img src="../images/register/../register/cart-empty.png" alt=""></a>
`
        $(".top_user").html(html)

        // $(".top_user").get(0).css("background", "url('../../../images/register/32.jpg')")
    }

    var url = urlParse(); // {}
    console.log(url);
    if (!url.gid) { // 如果不传gid
        // location.href = "../html/home.html";
    }



    function exit() {
        delCookie("lgc");
        location.reload();
    }
})