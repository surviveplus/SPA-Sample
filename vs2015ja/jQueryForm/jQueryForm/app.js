var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        var text1 = "SAMPLE";
        var check1 = true;
        var optionVaue;
        (function (optionVaue) {
            optionVaue[optionVaue["Value1"] = 0] = "Value1";
            optionVaue[optionVaue["Value2"] = 1] = "Value2";
        })(optionVaue || (optionVaue = {}));
        var radio = optionVaue.Value1;
        var select1 = optionVaue.Value2;
        var refresh = function () {
            $("#text1").val(text1);
            $("#check1").prop("checked", check1);
            $("input[name=r][value=" + optionVaue[radio] + "]").prop("checked", true);
            $("#select1").val(optionVaue[select1]);
        };
        refresh();
        $("#resetButton").click(function () {
            text1 = "SAMPLE1";
            check1 = true;
            radio = optionVaue.Value1;
            select1 = optionVaue.Value2;
            refresh();
        });
        $("#reset2Button").click(function () {
            text1 = "SAMPLE2";
            check1 = false;
            radio = optionVaue.Value2;
            select1 = optionVaue.Value1;
            refresh();
        });
        this.timerToken = setInterval(function () {
            text1 = $("#text1").val();
            check1 = ($("#check1:checked").length > 0);
            radio = optionVaue[$("input[name=r]:checked").val()];
            select1 = optionVaue[$("#select1").val()];
            _this.span.innerHTML =
                "text1 : " + text1 + "<br />" +
                    "check1 :" + check1 + "<br />" +
                    "radio :" + optionVaue[radio] + "<br />" +
                    "select1 :" + optionVaue[select1] + "<br />";
        }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
}());
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};
//# sourceMappingURL=app.js.map