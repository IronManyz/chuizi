$(function () {


    $("header").load("../html/header.html", function () {//引出头部
        $.getScript("../js/header.js");
    });

    $("footer").load("../html/foot.html", function () {
        $.getScript("../js/foot.js")
    })










    loadGoods()


    function loadGoods() {
        var user = getCookie("lgc");
        $.ajax({
            type: "post",
            url: "../php/searchShoppingCarByUser.php",
            data: { user },
            dataType: "json",
            success(result) {
                var { status, detail, list } = result;

                if (status) {
                    var html = "";
                    list.forEach(({ id, gId, goodsName, goodsPrice, goodsImg, buyNum, total }) => {
                        html += `<tr class="goods-items" data-id="${gId}">
                            <td class="checkbox"><input class="check-one check" type="checkbox" /></td>
                            <td class="goods">
                                <img src="${goodsImg}" alt="" />
                                <span>${goodsName}</span>
                            </td>
                            <td class="price">${goodsPrice}</td>
                            <td class="count"><span class="reduce" data-id="${gId}"></span>
                                <input class="count-input" type="text" value="${buyNum}" />
                                <span class="add" data-id="${gId}" >+</span>
                            </td>
                            <td class="subtotal">${total}</td>
                            <td class="operation"><span class="delete" data-id="${gId}">删除</span></td>
                        </tr>`
                    })

                    $("tbody").html(html)
                    $(".check-all").click(function () {

                        var status = $(this).prop("checked");
                        $(".check-one").prop("checked", status);
                        getTotal()
                    })

                    $(".check-one").click(function () {


                        var flag = $(".check-one").is(":not(:checked)")
                        $(".check-all").prop("checked", !flag);
                        getTotal();

                    })

                    $(".delete").click(function () {
                        if (confirm("是否删除该商品?")) {
                            $(this).parents("tr").remove();
                            isAllChecked();
                            getTotal();
                        }
                        $(this).data("id");
                        console.log($(this).data("id"));
                        // var id = getCookie("lgc")
                        console.log(user);
                        $.ajax({
                            type: "get",
                            url: "../php/deleteShoppingCarById.php",
                            dataType: "json",
                            data: { id: $(this).data("id"), user: user },
                            success(result) {

                                console.log(result);
                            }
                        })
                    })
                    $("#deleteAll").click(function () {
                        var list = $(".check-one:checked").parents("tr").map(function () {
                            // return $(this).attr("data-id");
                            return $(this).prop("dataset").id;  // ele.dataset.id
                        }).get();
                        console.log(list.join(","));

                        $(".check-one:checked").parents("tr").remove();
                        isAllChecked();
                        getTotal();
                    })

                    // 减号
                    $(".reduce").click(function () {

                        var _this = $(this);
                        var id = $(this).parents(".goods-items").data("id");

                        $.ajax({
                            type: "get",
                            url: "../php/updateShoppingCarById.php",
                            data: { id, type: 0 },
                            dataType: "json",
                            success(result) {
                                // debugger;
                                var { status, detail } = result;
                                console.log(result, 2222);
                                if (status) {

                                    var num = $(_this).next().val();
                                    console.log(num, 000);
                                    if (num <= 1) return false;
                                    num--;
                                    if (num == 1) {
                                        $(_this).text("");
                                    }
                                    $(_this).next().val(num);

                                    var price = $(_this).parent().prev().text();
                                    $(_this).parent().next().text((price * num).toFixed(2));
                                    getTotal();

                                } else {
                                    alert(detail);
                                }
                                getTotal();

                            }




                        })


                    })
                    // 加
                    $(".add").click(function () {
                        var _this = $(this);

                        var id = $(this).parents(".goods-items").data("id");

                        console.log(id, 21212);
                        $.ajax({
                            type: "get",
                            url: "../php/updateShoppingCarById.php",
                            data: { id, type: 1 },
                            dataType: "json",
                            success(result) {
                                // debugger;
                                var { status, detail } = result;
                                console.log(result, 2222);
                                if (status) {
                                    var num = $(_this).prev().val();
                                    console.log(_this);
                                    num++;
                                    $(_this).prev().val(num);

                                    var price = $(_this).parent().prev().text();

                                    $(_this).parent().next().text((price * num).toFixed(2));

                                    $(_this).prevAll(".reduce").text("-");

                                } else {
                                    alert(detail);
                                }
                                getTotal();

                            }
                        })




                    })




                } else {

                    $("tbody").html(`暂无商品 <a href='./goodsList.html'>采购商品</a>`)
                }
            }
        })

    }

})
function exit() {
    delCookie("lgc");
    location.reload();
}


function isAllChecked() {
    var flag = $(".check-one").is(":not(:checked)");
    $(".check-all").prop("checked", $(".check-one").length > 0 ? !flag : false);
}


function getTotal() {
    var sum = 0;
    var allPrice = 0;
    // debugger;
    $(".check-one:checked").parents("tr").each(function () {
        // debugger;
        var num = $(this).find(".count-input").val() * 1;
        var subtotal = $(this).find(".subtotal").text() * 1;
        sum += num;
        allPrice += subtotal;
    })
    $("#selectedTotal").text(sum);
    $("#priceTotal").text(allPrice.toFixed(2));
}
