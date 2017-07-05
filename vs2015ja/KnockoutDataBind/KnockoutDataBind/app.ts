 enum optionValue {
    Value1,
    Value2
}

 class Select1OptionItem {
     public Value: string;
     public Title: string;
     public OriginalValue: optionValue;

     constructor(value: optionValue, title: string) {
         this.Value = optionValue[value];
         this.Title = title; 
         this.OriginalValue = value;
     }
 }

class SampleModel {
    public Text1: KnockoutObservable<string> = ko.observable("SAMPLE");
    public Check1: KnockoutObservable<boolean> = ko.observable( true );

    //public Radio : optionValue = optionValue.Value1;
    //public Select1 : optionValue = optionValue.Value1;

    public Radio(value?: optionValue): optionValue{
        if (value != undefined) { this.RadioSelected(optionValue[value]); }
        return optionValue[this.RadioSelected()];
    }
    public RadioSelected: KnockoutObservable<string> = ko.observable("Value2");

    //public Select1Options = ko.observableArray(["Value1", "Value2"]);
    //public Select1(value?: optionValue) :optionValue{
    //    if (value != undefined) { this.Select1Selected(optionValue[value]); }
    //    return optionValue[this.Select1Selected()];
    //}
    //public Select1Selected: KnockoutObservable<string> = ko.observable("Value1");

    public Select1Options = ko.observableArray
        ([new Select1OptionItem(optionValue.Value1, "値 1"),
        new Select1OptionItem(optionValue.Value2, "値 2")]);

    public Select1(value?: optionValue): optionValue {
        if (value != undefined) { this.Select1Selected( Enumerable.From(this.Select1Options()).Where(($)=>$.OriginalValue == value).First() ); }
        return this.Select1Selected().OriginalValue;
    }
    public Select1Selected: KnockoutObservable<Select1OptionItem> = ko.observable < Select1OptionItem>();

}

 //class SampleModel {
 //    public Text1 ="SAMPLE";
 //    public Check1 = true;
 //    public Radio = optionVaue.Value1;

 //    public Select1Options =["Value1", "Value2"];
 //    public Select1Selected = optionVaue.Value1;
 //}


class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        var m = new SampleModel();

        //var m = ko.mapping.fromJS(new SampleModel());
        //m.optionValue = optionVaue;

        ko.applyBindings(m, $("body")[0]);

        $("#resetButton").click(() => {
            m.Text1("SAMPLE1");
            m.Check1(true);
            m.Radio(optionValue.Value1);
            //m.RadioSelected("Value1");
            m.Select1(optionValue.Value2);
            //m.Select1Selected("Value2");
        });
        $("#reset2Button").click(() => {
            m.Text1("SAMPLE2");
            m.Check1(false);
            m.Radio(optionValue.Value2);
            //m.RadioSelected("Value2");
            m.Select1(optionValue.Value1);
            //m.Select1Selected("Value1");
        });


        this.timerToken = setInterval(() => {
            this.span.innerHTML =
                "text1 : " + m.Text1() + "<br />" +
                "check1 :" + m.Check1() + "<br />" +
                "radio :" + m.RadioSelected() + " / " + optionValue[m.Radio()] + "<br />"+
                //"select1 :" + m.Select1Selected() + " / " + optionValue[m.Select1()]  + "<br />";
                "select1 :" + m.Select1Selected().Title + " / " + optionValue[m.Select1()] + "<br />";
        }, 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};