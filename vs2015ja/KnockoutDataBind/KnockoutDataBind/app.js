var optionValue;
(function (optionValue) {
    optionValue[optionValue["Value1"] = 0] = "Value1";
    optionValue[optionValue["Value2"] = 1] = "Value2";
})(optionValue || (optionValue = {}));
var Select1OptionItem = (function () {
    function Select1OptionItem(value, title) {
        this.Value = optionValue[value];
        this.Title = title;
        this.OriginalValue = value;
    }
    return Select1OptionItem;
}());
var SampleModel = (function () {
    function SampleModel() {
        this.Text1 = ko.observable("SAMPLE");
        this.Check1 = ko.observable(true);
        this.RadioSelected = ko.observable("Value2");
        //public Select1Options = ko.observableArray(["Value1", "Value2"]);
        //public Select1(value?: optionValue) :optionValue{
        //    if (value != undefined) { this.Select1Selected(optionValue[value]); }
        //    return optionValue[this.Select1Selected()];
        //}
        //public Select1Selected: KnockoutObservable<string> = ko.observable("Value1");
        this.Select1Options = ko.observableArray([new Select1OptionItem(optionValue.Value1, "値 1"),
            new Select1OptionItem(optionValue.Value2, "値 2")]);
        this.Select1Selected = ko.observable();
    }
    //public Radio : optionValue = optionValue.Value1;
    //public Select1 : optionValue = optionValue.Value1;
    SampleModel.prototype.Radio = function (value) {
        if (value != undefined) {
            this.RadioSelected(optionValue[value]);
        }
        return optionValue[this.RadioSelected()];
    };
    SampleModel.prototype.Select1 = function (value) {
        if (value != undefined) {
            this.Select1Selected(Enumerable.From(this.Select1Options()).Where(function ($) { return $.OriginalValue == value; }).First());
        }
        return this.Select1Selected().OriginalValue;
    };
    return SampleModel;
}());
//class SampleModel {
//    public Text1 ="SAMPLE";
//    public Check1 = true;
//    public Radio = optionVaue.Value1;
//    public Select1Options =["Value1", "Value2"];
//    public Select1Selected = optionVaue.Value1;
//}
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        var m = new SampleModel();
        //var m = ko.mapping.fromJS(new SampleModel());
        //m.optionValue = optionVaue;
        ko.applyBindings(m, $("body")[0]);
        $("#resetButton").click(function () {
            m.Text1("SAMPLE1");
            m.Check1(true);
            m.Radio(optionValue.Value1);
            //m.RadioSelected("Value1");
            m.Select1(optionValue.Value2);
            //m.Select1Selected("Value2");
        });
        $("#reset2Button").click(function () {
            m.Text1("SAMPLE2");
            m.Check1(false);
            m.Radio(optionValue.Value2);
            //m.RadioSelected("Value2");
            m.Select1(optionValue.Value1);
            //m.Select1Selected("Value1");
        });
        this.timerToken = setInterval(function () {
            _this.span.innerHTML =
                "text1 : " + m.Text1() + "<br />" +
                    "check1 :" + m.Check1() + "<br />" +
                    "radio :" + m.RadioSelected() + " / " + optionValue[m.Radio()] + "<br />" +
                    //"select1 :" + m.Select1Selected() + " / " + optionValue[m.Select1()]  + "<br />";
                    "select1 :" + m.Select1Selected().Title + " / " + optionValue[m.Select1()] + "<br />";
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