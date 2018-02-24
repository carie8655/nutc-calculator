
var answer = 0;
var display = 0;
var isDec = false;
var squ = 0;
var temp = 0;

$.fn.display = function (params) {
    if (temp < 15) {
        temp += 1;
        if (isDec) {
            squ += 1;
            display = parseFloat(params / (Math.pow(10, squ)) + parseFloat(display)).toFixed(squ);
            params === 0 ? $("input").val($("input").val() + '0') : $("input").val(display);
        } else {
            display = display * 10 + params;
            $("input").val(display);
        }
    } else {
        $("input").val("最多輸入十五位數");
    }
}

$.fn.calc = function (params) {
    switch (params) {
        case '+':
            parseFloat(answer) += parseFloat(display);
            break;
        case '-':
            parseFloat(answer) -= parseFloat(display);
            break;
        case '*':
            parseFloat(answer) *= parseFloat(display);
            break;
        case '/':
            parseFloat(answer) /= parseFloat(display);
            break;
    }
}

$("#clear").click(function () {
    display = 0;
    answer = 0;
    squ = 0;
    isDec = false;
    temp = 0;
    $("input").val(display);
})

$("#zero").click(function () {
    $("#zero").display(0);
})

$("#one").click(function () {
    $("#one").display(1);
})

$("#two").click(function () {
    $("#two").display(2);
})

$("#three").click(function () {
    $("#three").display(3);
})

$("#four").click(function () {
    $("#four").display(4);
})

$("#five").click(function () {
    $("#five").display(5);
})

$("#six").click(function () {
    $("#six").display(6);
})

$("#seven").click(function () {
    $("#seven").display(7);
})

$("#eight").click(function () {
    $("#eight").display(8);
})

$("#nine").click(function () {
    $("#nine").display(9);
})

$("#answer").click(function () {
    $("input").val(answer);
})

$("#add").click(function () {
    $("#add").calc('+');
})

$("#less").click(function () {
    $("#less").calc('-');
})

$("#mul").click(function () {
    $("#mul").calc('*');
})

$("#exc").click(function () {
    $("#exc").calc('/');
})

$("#point").click(function () {
    if (!isDec) {
        isDec = true;
        $("input").val(display + '.');
    }
})

$(document).ready(function () {
    $("input").val(answer);
});
