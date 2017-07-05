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

        var text1: string = "SAMPLE";
        var check1: boolean = true;

         enum optionVaue {
            Value1 ,
            Value2
         }
         var radio: optionVaue = optionVaue.Value1;
         var select1: optionVaue = optionVaue.Value2;

        var refresh = () => {
            $("#text1").val(text1);
            $("#check1").prop("checked", check1);
            $("input[name=r][value=" + optionVaue[radio] + "]").prop("checked", true);
            $("#select1").val(optionVaue[select1]);

        };
        refresh();

        $("#resetButton").click(() => {
            text1 = "SAMPLE1";
            check1 = true;
            radio = optionVaue.Value1;
            select1 = optionVaue.Value2;
            refresh();
        });
        $("#reset2Button").click(() => {
            text1 = "SAMPLE2";
            check1 = false;
            radio = optionVaue.Value2;
            select1 = optionVaue.Value1;
            refresh();
        });

        this.timerToken = setInterval(() => {
            text1 = $("#text1").val();
            check1 = ($("#check1:checked").length > 0);
            radio = optionVaue[$("input[name=r]:checked").val() as string];
            select1 =  optionVaue[$("#select1").val() as string];

            this.span.innerHTML =
                "text1 : " + text1 + "<br />" +
            "check1 :" + check1+ "<br />" +
            "radio :" + optionVaue[radio] + "<br />" +
            "select1 :" + optionVaue[select1] + "<br />" 
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