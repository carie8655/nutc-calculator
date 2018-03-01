$(document).ready(function () {
    var operand = [];
    var operator = '';
    var display = 0;
    var isDec = false;
    var squ = 0;
    var userClick = false;

    $("#answer_window > input").val(display);

    $("button").click(function () {
        $("button").switchValue($(this).val());
    })

    $('input[name="color_selection"]').click(function () {
        var value = $('input[name="color_selection"]:checked').val();
        switch (value) {
            case 'gray':
                $('body').css({ "background-color": "#B5B5B3" });
                $('#wrapper').css({ "background-color": "#99B6BD" });
                break;
            case 'blue':
                $('body').css({ "background-color": "#61A2DA" });
                $('#wrapper').css({ "background-color": "#F6A7B8" });
                break;
        }
    })

    /**
     * 顯示
     */
    $.fn.displayNumber = function (params) {
        userClick = true;
        if (display.toString().length < 15) {
            if (isDec) {
                squ += 1;
                display = parseFloat(parseFloat(params / (Math.pow(10, squ)) + parseFloat(display)).toFixed(squ));
                params === 0 ? $("#answer_window > input").val($("#answer_window > input").val() + '0') : $("#answer_window > input").val(display);
            } else {
                display = parseFloat(display) * 10 + params;
                $("#answer_window > input").val(display);
            }
        } else {
            $("#answer_window > input").val("最多輸入十五位數");
        }
    }

    /**
     * 計算
     */
    $.fn.calc = function () {
        var operand_1 = operand.pop();
        var operand_2 = operand.pop();
        var result = 0

        switch (operator) {
            case '+':
                result = parseFloat(operand_1) * 10000 + parseFloat(operand_2) * 10000; // 防止JS的BUG
                break;
            case '-':
                result = parseFloat(operand_2) * 10000 - parseFloat(operand_1) * 10000;
                break;
            case '*':
                result = parseFloat(operand_1) * 10000 * parseFloat(operand_2);
                break;
            case '/':
                result = parseFloat(operand_2) * 10000 / parseFloat(operand_1);
                break;
        }
        operand.push(result / 10000);
        $("#answer_window > input").val(result / 10000);
        operator = '';
    }


    $.fn.operatorCalcu = function (params) {
        !userClick ? params === '*' || params === '/' ? operand.push(1) : operand.push(0) : operand.push(display);

        if (operand.length > 1) {
            $(this).calc();
        }

        operator = params;
        $(this).clean();
    }

    $.fn.switchValue = function (params) {

        switch (params) {
            case '+': case '-': case '*': case '/':
                $(this).operatorCalcu(params);
                break;
            case 'AC':
                display = 0;
                squ = 0;
                isDec = false;
                operand = [];
                operator = '';
                $("#answer_window > input").val(display);
                break;
            case '←':
                var value = $("#answer_window > input").val();
                value = value.toString().substr(0, value.toString().length - 1);
                if (value.toString().length <= 0) {
                    value = 0;
                }
                if (value.toString().indexOf('.') > -1) {
                    isDec = true;
                    squ = value.toString().substr(value.toString().indexOf('.') + 1, value.toString().length).toString().length;
                } else {
                    isDec = false;
                    squ = 0;
                }
                $("#answer_window > input").val(value);
                display = parseFloat(value);
                break;
            case '.':
                if (!isDec) {
                    isDec = true;
                    $("#answer_window > input").val(display + '.');
                }
                break;
            case '=':
                if (operator != '') {
                    operand.push(display);
                    $(this).calc();
                }

                display = parseFloat($("#answer_window > input").val());
                squ = 0;
                isDec = false;
                userClick = true;
                operator = '';
                operand = [];
                break;
            default:
                $(this).displayNumber(parseInt(params));
                break;
        }
    }

    $.fn.clean = function () {
        display = 0;
        squ = 0;
        isDec = false;
        userClick = false;
    }
});