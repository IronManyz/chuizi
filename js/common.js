//  把所有的合法字符放到数组中 

var numList = [];
for (var i = 48; i <= 57; i++) {  // 小写的编码范围
    var char = String.fromCharCode(i);
    numList.push(char);
}
// console.log(numList);

var bigList = [];
for (var i = 65; i <= 90; i++) {  // 小写的编码范围
    var char = String.fromCharCode(i);
    bigList.push(char);
}
// console.log(bigList);

var smallList = [];
for (var i = 97; i <= 122; i++) {  // 小写的编码范围
    var char = String.fromCharCode(i);
    smallList.push(char);
}
// console.log(smallList);

var speList = ["_"]; // 允许使用的特殊字符

var normalList = numList.concat(smallList, bigList, speList);
// console.log(normalList);



// var codeList = numList.concat(smallList, bigList);
// var arr = [];
// for (var i = 0; i < 4; i++) {
//     var index = Math.floor(Math.random() * codeList.length);
//     var char = codeList[index];
//     if (arr.indexOf(char) == -1) {
//         arr.push(char);
//     } else {
//         i--;
//     }
// }
// console.log(arr);    // arr放到页面中会隐式转字符串 变成逗号分隔的形式 (a,b,c,d)  => 使用join



function createCode() {
    var codeList = numList.concat(smallList, bigList);
    var arr = [];
    for (var i = 0; i < 4; i++) {
        var index = Math.floor(Math.random() * codeList.length);
        var char = codeList[index];
        if (arr.indexOf(char) == -1) {
            arr.push(char);
        } else {
            i--;
        }
    }
    // console.log(arr);    // arr放到页面中会隐式转字符串 变成逗号分隔的形式 (a,b,c,d)  => 使用join
    return arr.join("");
}



function dateFormat(pattern) {  // "YY-MM-DD hh:mm:ss"
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth() + 1;  // 0-11
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    // var str = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    // console.log(str);

    // pattern = pattern.replace("YY", year);  // 方法返回替换后的新字符串(也可以使用replace)
    // pattern = pattern.replace("MM", month);
    // pattern = pattern.replace("DD", day);
    return pattern.replace("YY", year).replace("MM", month).replace("DD", beauty(day)).replace("hh", beauty(hour)).replace("mm", beauty(minute)).replace("ss", beauty(second));
}



function beauty(num) {
    return num < 10 ? "0" + num : num;
}