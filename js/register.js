$(function () {


    $("header").load("../html/header.html", function () {//引出头部
        $.getScript("../js/header.js");
    });

    $("footer").load("../html/foot.html", function () {
        $.getScript("../js/foot.js")
    })



    var pwdFalg, phone, codeFlag, checkFlag


    $(".phone").blur(function () {

        var phone = $(".phone").val();
        console.log(phone);
        var phoneReg = /^1[3-9]\d{9}$/;

        if (phoneReg.test(phone)) {
            // $(".phoneSpan").text("√ 输出正确").css({ color: "green" });

            $.ajax({
                type: "get",
                url: "../php/isExistPhone.php",
                data: { phone },
                dataType: "json",
                success(result) {
                    var { status, detail } = result;
                    console.log(detail, status);
                    if (status) {
                        $(".phoneSpan").text("×" + detail).css({ color: "green" });
                        phoneFlag = true;
                    } else {
                        $(".phoneSpan").text("×" + detail).css({ color: "red" });
                    }
                }
            })





        } else {
            $(".phoneSpan").text("× 请输入正确电话").css({ color: "red" });
        }
    })
    $(".code").val();
    console.log($(".code").val())
    var codeAuto = $(".code-auto-wrap").text(createCode());

    $(".code-auto-wrap").click(function () {
        codeAuto.text(createCode());
    })
    $(".code-cut").click(function () {
        codeAuto.text(createCode());
    })

    var codei = codeAuto.text();

    $(".code").blur(function () {

        if (codei.toLowerCase() === $(".code").val().toLowerCase()) {
            $(".codeSpan").text("√ 验证码输出正确").css({ color: "green" });
            codeFlag = true;
        } else {
            $(".codeSpan").text("× 验证码输出错误").css({ color: "red" });
        }
    })

    $(".pwd").blur(function () {

        // pwdFlag = false;
        var pwd = $(".pwd").val().trim();

        var pwdReg = /^\w{8,20}$/;
        if (pwdReg.test(pwd)) {
            var numReg = /[0-9]/;
            var bigReg = /[A-Z]/;
            var smallReg = /[a-z]/;
            var preReg = /[_]/;
            var numFlag = false;
            var bigFlag = false;
            var smallFlag = false;
            var preFlag = false;
            numFlag = numReg.test(pwd) ? true : false;
            bigFlag = bigReg.test(pwd) ? true : false;
            smallFlag = smallReg.test(pwd) ? true : false;
            preFlag = preReg.test(pwd) ? true : false;
            var sum = preFlag + smallFlag + bigFlag + numFlag;
            var levea = "";
            switch (sum) {
                case 1:
                    levea = "弱";
                    break;
                case 2:
                    levea = "中";
                    break;
                case 3:
                    levea = "强";
                    break;
                case 4:
                    levea = "超强";
                    break;
            }
            $(".pwdSpan").text("√" + levea).css({ color: "green" });
            pwdFlag = true;
        } else {
            $(".pwdSpan").text("× 密码由6 - 12位字母大小写 数字 _ 组成").css({ color: "red" });
        }
    })

    $("#btn").click(function () {
        var phone = $(".phone").val().trim();
        var pwd = $(".pwd").val().trim();

        if (phoneFlag) {
            if (codeFlag) {

                if (pwdFlag) {

                    $.ajax({
                        type: "post",
                        data: { phone, pwd },
                        url: "../php/register.php",
                        dataType: "json",
                        success(result) {
                            var { status, detail } = result;
                            if (status) {
                                alert(detail);
                                location.href = "../html/login.html";
                            } else {
                                alert(detail);
                            }
                        }
                    })

                } else {
                    alert("密码格式有误")
                }


            } else {
                alert("请填写正确验证码");
            }
        } else {
            alert("请填写正确电话号");
        }
    })



    $(".phone-perfix").click(function () {
        $(".phone-list").css({
            display: "block",
        })
        $(".phone-list li").click(function () {
            var phoneR = $(this).attr("data-areacode");
            $(".phone-status").text(phoneR);
            console.log($(".phone-list"));
            $(".phone-perfix").css({
                overflow: "hidden",
            });
        })
    })











})