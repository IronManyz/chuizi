$(function () {

    // debugger;
    $("header").load("../html/header.html", function () {//引出头部
        $.getScript("../js/header.js");
    });

    $("footer").load("../html/foot.html", function () {
        $.getScript("../js/foot.js")
    })



    var key = "";  // 全局变量,记录关键词(默认 "")
    var orderCol = "id"; //全局变量,排序的列名(默认 "id")
    var orderType = "asc"; // 全局变量,排序的列名(默认 "asc")
    var pageIndex = 1; // 全局变量,保存页码(第几页)
    var showNum = 20; // 全局变量,每页显示多少条

    var ul = $(".hot_items").get(0);
    var pageTips = $(".pageTips").get(0)

    console.log(ul, 1111);
    var url = urlParse()
    var gId = url.gid;
    console.log(url, "wd");


    loadGoods()




    //加人购物车







    $(".item_four").mousemove(function () {
        $(this).css({
            "box-shadow": "0 0 10px 3px #ccc",

        })
    })

    $(".orderColBox").click(function (e) {

        var e = e || window.event;
        var target = e.target || e.srcElement;
        console.log(e, target);

        if (target.className == "orderCol") {
            orderCol = target.value;
            // console.log(orderCol);
            loadGoods();
        }
        else if (target.className == "orderType") {
            orderType = target.value;
            console.log(orderType);
            loadGoods();
        }

    })

    function loadGoods() {
        // debugger;
        $.ajax({
            type: "get",
            url: "../php/searchGoodsOrderLimit.php",
            data: { key, orderCol, orderType, pageIndex, showNum },  // 不提形参,就找全局的
            dataType: "json",
            success(result) {
                console.log(result);
                var { status, detail, list, total, maxPage } = result;
                console.log(list)
                if (status) {
                    var html = "";
                    list.forEach(function (item) {
                        var { id, goodsId, goodsName, goodsPrice, goodsImg } = item;

                        html += `<li class="item_four" >
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
                     
                        <button class="addshopping" data-id=${goodsId}>
                         <i class="iconfont icon-gouwucheman"></i>
                        <span class="addshoppingCar">加入购物车</span>
                    </button>
                    </li>`

                    })
                    ul.innerHTML = html;


                    pageTips.innerHTML = `${pageIndex}/${maxPage},共${total}条`;

                    // 上一页
                    $(".prev").off("click").click(function () {
                        if (pageIndex <= 1) return false;
                        // 自增
                        pageIndex--;
                        // 提示
                        pageTips.innerHTML = `${pageIndex}/${maxPage},共${total}条`;
                        // 渲染
                        loadGoods();
                    })

                    // 下一页 
                    $(".next").off("click").click(function () {
                        if (pageIndex >= maxPage) return false;
                        // 自增
                        pageIndex++;
                        // 提示
                        pageTips.innerHTML = `${pageIndex}/${maxPage},共${total}条`;
                        // 渲染
                        loadGoods();
                    })




                    $(".addshoppingCar").click(function () {
                        // debugger
                        // var url = urlParse()
                        // var gId = url.gid;
                        var gId = $(this).parent().get()[0].dataset.id;
                        console.log(gId);
                        // var _this = this;

                        var user = getCookie("lgc");
                        var buyNum = 1;
                        if (user) {
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

                                        if (confirm("加入成功,是否进入购物车?")) {
                                            location.href = "../html/goodsCer.html"
                                        }

                                    } else {
                                        alert(detail);
                                    }
                                }
                            })

                        } else {
                            if (confirm("请先登录再加入购物车，是否登录")) {
                                var url = window.location.href;
                                location.href = "../html/login.html?" + encodeURIComponent(url);
                            }
                        }
                    })
                    console.log($(".log-tips"));








                } else {
                    ul.innerHTML = "暂无商品";
                }

                $(".orderCol").click(function () {
                    orderCol = $(this).val();
                    $(".pageTips").html(`${pageIndex}/${maxPage},共${total}条`)
                    loadGoods();
                })
                $(".orderType").click(function () {
                    orderType = $(this).val();
                    $(".pageTips").html(`${pageIndex}/${maxPage},共${total}条`)
                    loadGoods();
                })
            }


        })
    }












})