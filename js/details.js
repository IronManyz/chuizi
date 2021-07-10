$(function () {


    $("header").load("../html/header.html", function () {//引出头部
        $.getScript("../js/header.js");
    });

    $("footer").load("../html/foot.html", function () {
        $.getScript("../js/foot.js")
    })




    // var key = ""; // 全局变量,记录关键词(默认 "")
    // var orderCol = "id"; //全局变量,排序的列名(默认 "id")
    // var orderType = "asc"; // 全局变量,排序的列名(默认 "asc")
    // var pageIndex = 1; // 全局变量,保存页码(第几页)
    // var showNum = 20; // 全局变量,每页显示多少条


    var url = urlParse()
    var gId = url.gid;
    console.log(gId);
    console.log(url);
    if (!url.gid) { // 如果不传gid
        location.href = "./goodsList.html";
    }
    loadGoods()
    function loadGoods() {

        $.ajax({
            type: "get",
            url: "../php/searchGoodsByGoodsId.php",
            data: {
                gid: url.gid
            },
            dataType: "json",
            success: function (result) {
                console.log(result);

                var {
                    status,
                    detail,
                    data
                } = result;
                if (status) {
                    var html = "";
                    var {
                        id,
                        goodsId,
                        goodsName,
                        goodsImg,
                        goodsPrice,
                        smallPicList,
                        bigPicList,
                        goodsDetail
                    } = data;

                    html += ` <div class="gray_box">
                        <div class="gallery_wrapper">
                            <div class="gallery left cl">
                                
                            <div class="leftbox">
                            <div class="shadow"></div>
                            <img class="smallImg" src="${bigPicList[0]}" alt="">
                        </div>
                        <ul class="haha">
                          
                        </ul>
                        <div class="showBigImg">
                            <img class="bigImg" src="${bigPicList[0]}" alt="">
                        </div>


                             
                        </div>
                        </div>
                        <div class="item_information">
                            <article class="item_title">
                                <h1>${goodsName}</h1>
                                <h2></h2>
                                <div class="item_price">
                                    <span>
                                        <em>¥</em> <i>${goodsPrice}</i>
                                    </span>
                                    
                                </div>
                            </article>
            
                            <section class="item_spec_package">
                                <div class="item_spec">
                                    <span class="spec_title">款式选择</span>
                                    <ul class="spec_info">
                                        <li class="active">
                                            <aside class="specs_item">
                                                <h1 class="item_name">定制</h1>
                                            </aside>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                            <section class="item_spec_color">
                                <div class="item_spec">
                                    <span class="spec_title">颜色选择</span>
                                    <ul class="spec_info">
                                        <li>
                                            <aside>
                                                <span class="color_box">
                                                    <i class="color_item">
                                                        <img src="https://resource.smartisan.com/resource/85c73076d653ab42954d499c241a0d7e.jpg?x-oss-process=image/resize,w_52"
                                                            alt="">
                                                    </i>
                                                </span>
                                                <label for="">藏蓝色</label>
                                            </aside>
                                        </li>
                                        <li>
                                            <aside>
                                                <span class="color_box">
                                                    <i class="color_item">
                                                        <img src="https://resource.smartisan.com/resource/e647e77234f9ed0fde9dd4084d35ff57.jpg?x-oss-process=image/resize,w_52"
                                                            alt="">
                                                    </i>
                                                </span>
                                                <label for="">白色</label>
                                            </aside>
                                        </li>
                                        <li>
                                            <aside>
                                                <span class="color_box">
                                                    <i class="color_item">
                                                        <img src="https://resource.smartisan.com/resource/4ef6f3a638cdb3d4546b89bb46a16621.jpg?x-oss-process=image/resize,w_52"
                                                            alt="">
                                                    </i>
                                                </span>
                                                <label for="">黑色</label>
                                            </aside>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                            <section class="item_spec_package">
                                <div class="item_spec">
                                    <span class="spec_title">内存选择</span>
                                    <ul class="spec_info">
                                        <li class="active">
                                            <aside class="specs_item">
                                                <h1 class="item_name">128G</h1>
                                            </aside>
                                        </li>
                                        <li class="">
                                            <aside class="specs_item">
                                                <h1 class="item_name">256G</h1>
                                            </aside>
                                        </li>
                                        <li class="">
                                            <aside class="specs_item">
                                                <h1 class="item_name">512G</h1>
                                            </aside>
                                        </li>
            
                                    </ul>
                                </div>
                            </section>
                            <section class="item_count_wrapper">
                                <div class="item_count">
                                    <span class="count_title">数量选择</span>
                                    <aside class="do_count">
                                        <div class="count">
                                            <span class="minus"><i></i> -</span>
                                            <input type="text" value="1" class="count-input">
                                            <span class="add"><i></i>+</span>
                                        </div>
                                    </aside>
                                </div>
                            </section>
                            <div class="sku_custom_tips_wrapper">
                                <div class="sku_custom_tips">
                                
                                <a class="addShopping" href="javascript:;">加入购物车</a>
                                
                                        <a href=""class="buy">现在购买</a>
                                    </div>
                                </div>
                            </div>
                        </div>
            
            
                    </div>`

                    $(".item_wrapper").html(html);


                    var switchListHtml = "";
                    var len = bigPicList.length >= 4 ? 4 : bigPicList.length
                    for (var i = 1; i <= len; i++) {
                        switchListHtml += `  <li>
                                <img   src="${bigPicList[i]}" bigImg="${bigPicList[i]} "alt="">
                            </li>`
                    }

                    $(".haha").html(switchListHtml)


                    // 页面渲染
                    $(document).on("click", ".haha li", function () {
                        $(this).addClass("active").siblings().removeClass("active")

                        var imgSrc = $(this).find("img").attr("bigImg")
                        $(".smallImg,.bigImg").prop("src", imgSrc)
                    })


                    $(document).on("mousemove", ".shadow", function (e) {

                        var scaL = $(".bigImg").innerWidth() / $(".smallImg").innerWidth();


                        maxLeft = $(".leftbox").innerWidth() - $(".shadow").innerWidth();
                        maxTop = $(".leftbox").innerHeight() - $(".shadow").innerHeight();




                        var x = e.pageX - $(".left").offset().left - $(".shadow").innerWidth() / 2;
                        var y = e.pageY - $(".left").offset().top - $(".shadow").innerHeight() / 2;

                        if (x < 0) x = 0;
                        if (x > maxLeft) x = maxLeft;
                        if (y < 0) y = 0;
                        if (y > maxTop) y = maxTop;


                        $(".shadow").css({ left: x + "px" });
                        $(".shadow").css({ top: y + "px" });

                        $(".bigImg").css({ left: -scaL * x + "px" });
                        $(".bigImg").css({ top: -scaL * y + "px" });


                    })

                    $(document).on("mouseenter", ".leftbox", function () {
                        $(".shadow").css({ display: "block" })
                        $(".showBigImg").css({ display: "block" })
                    })

                    $(document).on("mouseleave", ".leftbox", function () {
                        $(".shadow").css({ display: "none" })
                        $(".showBigImg").css({ display: "none" })
                    })








                    var countInpVal = $(".count-input").val();

                    $(".add").click(function () {
                        countInpVal++;
                        $(".count-input").val(countInpVal);
                        if (countInpVal > 1) {
                            $(".minus").text("-");
                        }
                    })
                    $(".minus").click(function () {
                        if (countInpVal > 1) {
                            countInpVal--;
                        }
                        if (countInpVal == 1) {
                            $(".minus").text("");
                        }
                        $(".count-input").val(countInpVal);
                    })

                    $()

                    // var gId = url.gid;
                    // console.log(gId, "wocaonai");



                    $(".addShopping").click(function () {

                        var user = getCookie("lgc");
                        if (user) {
                            // var gId = url.gid;
                            var buyNum = countInpVal;
                            console.log(gId, buyNum, "ooooo");
                            $.ajax({
                                type: "post",
                                url: "../php/addToShoppingCar.php",
                                data: {
                                    gId,
                                    buyNum,
                                    user,
                                },
                                dataType: "json",
                                success({ status, detail }) {
                                    if (status) {
                                        alert(detail);
                                    } else {
                                        alert(detail);
                                    }
                                }
                            })
                            if (status) {
                                if (confirm("加入成功,是否进入购物车?")) {

                                    location.href = "../html/goodsCer.html"
                                }
                            } else {
                                alert(detail);
                            }



                        } else {
                            if (confirm("请先登录再加入购物车，是否登录")) {
                                var url = window.location.href;
                                location.href = "../html/login.html?" + encodeURIComponent(url);
                            }

                        }
                    })





                } else {
                    $(".item_wrapper").html("暂无商品");

                }



            }
        })
    }

















})







