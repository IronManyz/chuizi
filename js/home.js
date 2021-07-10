// 轮播图
$(function () {
    var clientWidth = $(".swiper").width();
    var index = 0;
    var timer = null;

    $("header").load("../html/header.html", function () {//引出头部
        $.getScript("../js/header.js");
    });

    $("footer").load("../html/foot.html", function () {
        $.getScript("../js/foot.js")
    })





    //" 点击轮播
    $(".bennav li").click(function () {

        $(this).addClass("active").siblings().removeClass("active");
        index = $(this).index();
        $(".swiperBar").animate({ left: -clientWidth * index }, 1000)
    })
    $(".wrap").hover(function () {
        clearInterval(timer);
    }, function () {
        autoPlay();
    })
    $(".ileft").click(function () {
        index--;
        // 左键连点问题   小于下标最小值? 
        // 左键连点是回调函数不会执行,index可能出现负值  

        // 怎么解决? => 从第一张滚动到第四张 (看到的)
        // 第一张 切到 第五张  滚动到 第四张

        if (index < 0) {
            index = $(".swiperBar li").length - 1;
            $(".swiperBar").stop().css({ left: -clientWidth * index });
            index--;
        }


        // 如果是第五张  默认把第一个点变为活跃状态
        var activeIndex = index >= $(".nav li").length ? 0 : index
        $(".nav li").eq(activeIndex).addClass("active").siblings().removeClass("active");
        $(".swiperBar").stop().animate({ left: -clientWidth * index }, 300, function () {
            // 每次运动完毕 判断是否是第五张 => 切第一张
            // if (index >= $(".nav li").length) {
            //     index = 0;
            //     $(".swiperBar").css({ left: 0 })
            // }
        });
    })
    $(".iright").click(function () {

        index++;

        // 右键连点问题 超出下标最大值? 
        // 右键连点是回调函数不会执行,没有办法从第五张切到第一张,后续会出现空白 index超出最大值(4)

        // 怎么解决?
        // 连点时第五张看起来就是第一张,超出第五张应该显示第二张 (超出第五张 切换到第一张 滚动到第二张)

        if (index > $(".swiperBar li").length - 1) {  // index>4
            index = 0;
            $(".swiperBar").stop().css({ left: 0 })
            index++;
        }


        // 如果是第五张  默认把第一个点变为活跃状态
        var activeIndex = index >= $(".nav li").length ? 0 : index
        $(".nav li").eq(activeIndex).addClass("active").siblings().removeClass("active");
        $(".swiperBar").stop().animate({ left: -clientWidth * index }, 300, function () {
            // 每次运动完毕 判断是否是第五张 => 切第一张
            // if (index >= $(".nav li").length) {
            //     index = 0;
            //     $(".swiperBar").css({ left: 0 })
            // }
        });
    })

    function autoPlay() {
        clearInterval(timer);
        timer = setInterval(function () {
            index++;

            // 如果是第五张  默认把第一个点变为活跃状态
            var activeIndex = index >= $(".nav li").length ? 0 : index
            $(".nav li").eq(activeIndex).addClass("active").siblings().removeClass("active");
            $(".swiperBar").animate({ left: -clientWidth * index }, 300, function () {
                // 每次运动完毕 判断是否是第五张 => 切第一张
                if (index >= $(".swiperBar li").length - 1) {
                    index = 0;
                    $(".swiperBar").css({ left: 0 })
                }
            });

        }, 3000)
    }


    var key = "";  // 全局变量,记录关键词(默认 "")
    var orderCol = "id"; //全局变量,排序的列名(默认 "id")
    var orderType = "asc"; // 全局变量,排序的列名(默认 "asc")
    var pageIndex = 1; // 全局变量,保存页码(第几页)
    var showNum = 12; // 全局变量,每页显示多少条
    // var ul = document.getElementsByClassName("hot_items")[0];
    // var ul = $(".hot_items").get(0);
    // var ula = $("#hot_items5").get(0);
    // var ulb = $("#hot_items2 li");
    // var ulc = $("#hot_items3");
    // var uld = $("#hot_items4");
    // var pageTips = $(".pageTips").get(0)
    // var ul = $("hot_items");
    // console.log(ul, ulb, ulc, uld, 1111);

    // 动态生成
    loadGoods()


    function loadGoods() {
        $.ajax({
            type: "get",
            url: "../php/searchGoodsOrderLimit.php",
            data: { key, orderCol, orderType, pageIndex, showNum },  // 不提形参,就找全局的
            dataType: "json",
            success(result) {
                console.log(result);
                var { status, detail, list, total, maxPage } = result;
                if (status) {
                    var html = "";
                    list.forEach(function (item) {
                        var { id, goodsId, goodsName, goodsPrice, goodsImg } = item;
                        html += `<li class="item_four">
                            <a href="../html/details.html?gid=${goodsId}">
                            <div class="product_box_item">
                                <div>
                                    <div class="item_img">
                                        <img src="${goodsImg}"
                                            alt="" style="opacity: 1; transition: opacity 0.3s ease-in-out 0s;">
                                    </div>
                                    <h4>${goodsName}</h4>
                                    <h6></h6>
                                </div>                      

                                <div class="item_price">
                                    <div class="discount_price">
                                        <span>
                                            <i>¥</i>
                                            <span>${goodsPrice}</span>
                                        </span>
                                    </div>
                                    <div class="original_price">
                                        <span>
                                            <i>¥</i>
                                            <span>${goodsPrice}</span>
                                        </span>

                                    </div>
                                </div>

                            </div>
                            </a>
                        </li>`

                    })

                    console.log($(".hot_items1"));
                    $(".hot_items1").html(html);
                    $(".hot_items2").html(html);
                    $(".hot_items3").html(html);
                    $(".hot_items4").html(html);
                    $(".hot_items5").html(html);

                } else {
                    ul.innerHTML = "暂无商品";
                }
            }
        })
    }








})