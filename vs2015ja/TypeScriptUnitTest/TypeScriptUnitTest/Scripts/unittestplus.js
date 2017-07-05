/// <reference path="../jquery/jquery.d.ts" />
/// <reference path="../linq/linq.d.ts" />
/// <reference path="../qunit/qunit.d.ts" />
var surviveplus;
(function (surviveplus) {
    var ConsoleForTestContextWriter = (function () {
        function ConsoleForTestContextWriter(defaultConsole) {
            this.text = "";
            this.writer = defaultConsole;
            var another = this.writer;
            if (another && another.writer) {
                this.writer = another.writer;
            } // end if
        } // end constructor
        ConsoleForTestContextWriter.prototype.Commit = function (context) {
            context.consoleOutput = this.text;
            console = this.writer;
        };
        ConsoleForTestContextWriter.prototype.assert = function (test, message) {
            var optionalParams = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                optionalParams[_i - 2] = arguments[_i];
            }
            this.writer.assert(test, message, optionalParams);
        };
        ConsoleForTestContextWriter.prototype.clear = function () {
            this.text = "";
            this.writer.clear();
        };
        ConsoleForTestContextWriter.prototype.count = function (countTitle) { };
        ConsoleForTestContextWriter.prototype.debug = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        ConsoleForTestContextWriter.prototype.dir = function (value) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        ConsoleForTestContextWriter.prototype.dirxml = function (value) { };
        ConsoleForTestContextWriter.prototype.error = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        ConsoleForTestContextWriter.prototype.group = function (groupTitle) { };
        ConsoleForTestContextWriter.prototype.groupCollapsed = function (groupTitle) { };
        ConsoleForTestContextWriter.prototype.groupEnd = function () { };
        ConsoleForTestContextWriter.prototype.info = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        ConsoleForTestContextWriter.prototype.log = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            var text = message;
            if (text) {
                this.text += text + "\r\n";
            }
            else {
                this.text += JSON.stringify(message) + "\r\n";
            } // end if
            this.writer.log(message, optionalParams);
        };
        ConsoleForTestContextWriter.prototype.msIsIndependentlyComposed = function (element) { return true; };
        ConsoleForTestContextWriter.prototype.profile = function (reportName) { };
        ConsoleForTestContextWriter.prototype.profileEnd = function () { };
        ConsoleForTestContextWriter.prototype.select = function (element) { };
        ConsoleForTestContextWriter.prototype.time = function (timerName) { };
        ConsoleForTestContextWriter.prototype.timeEnd = function (timerName) { };
        ConsoleForTestContextWriter.prototype.trace = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        ConsoleForTestContextWriter.prototype.warn = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        return ConsoleForTestContextWriter;
    }()); // end class
    var UnitTestPlus = (function () {
        function UnitTestPlus() {
        }
        UnitTestPlus.Start = function (moduleName, className) {
            QUnit.module(moduleName);
            var q = QUnit;
            var context;
            var writer;
            q.testStart = function (details) {
                writer = new ConsoleForTestContextWriter(console);
                console = writer;
                context = new TestContext();
                context.moduleName = moduleName;
                context.className = className;
                context.testTitle = details.name;
                context.startTime = new Date();
            };
            q.testDone = function (details) {
                writer.Commit(context);
                context.endTime = new Date();
                UnitTestPlus.contextList.push(context);
            };
        };
        UnitTestPlus.GetTestContext = function (moduleName, testTitle) {
            return Enumerable.From(UnitTestPlus.contextList).Where(function ($, i) {
                return ($.moduleName == moduleName && $.testTitle == testTitle);
            }).First();
        };
        UnitTestPlus.contextList = new Array();
        return UnitTestPlus;
    }());
    surviveplus.UnitTestPlus = UnitTestPlus; // end classs
    var TestContext = (function () {
        function TestContext() {
        }
        TestContext.prototype.GetElapsedTime = function () {
            var time = new Date(0, 0, 0, 0, 0, 0, this.endTime.getTime() - this.startTime.getTime());
            return time.toLocaleTimeString() + "." + ("000" + time.getMilliseconds().toString()).slice(-3);
        };
        return TestContext;
    }());
    surviveplus.TestContext = TestContext; // end classs
    (function (Culture) {
        Culture[Culture["en"] = 0] = "en";
        Culture[Culture["ja"] = 1] = "ja";
    })(surviveplus.Culture || (surviveplus.Culture = {}));
    var Culture = surviveplus.Culture;
    var ReportingConsole = (function () {
        function ReportingConsole() {
        }
        ReportingConsole.WriteConstructorArgs = function (constructorArgs) {
            switch (ReportingConsole.Culture) {
                case (Culture.ja):
                    console.log("コンストラクタ引数は " + JSON.stringify(constructorArgs) + " を設定します。");
                    break;
                case (Culture.en):
                default:
                    console.log("The constructor will be called with setting " + JSON.stringify(constructorArgs) + " as the parameter(s).");
                    break;
            }
        };
        ReportingConsole.WriteProperties = function (props) {
            switch (ReportingConsole.Culture) {
                case (Culture.ja):
                    console.log("プロパティは " + JSON.stringify(props) + " を設定します。");
                    break;
                case (Culture.en):
                default:
                    console.log("The properties will be set with setting " + JSON.stringify(props) + ".");
                    break;
            }
        };
        ReportingConsole.WriteArgsAndExpected = function (args, expected) {
            switch (ReportingConsole.Culture) {
                case (Culture.ja):
                    console.log("引数に " + JSON.stringify(args) + " を指定してメソッドを実行します。");
                    console.log("期待値は " + JSON.stringify(expected) + " です。");
                    break;
                case (Culture.en):
                default:
                    console.log("The method will be called with setting " + JSON.stringify(args) + " as the parameter(s).");
                    console.log("The expected value is " + JSON.stringify(expected) + ".");
                    break;
            }
        };
        ReportingConsole.WriteActual = function (actual) {
            switch (ReportingConsole.Culture) {
                case (Culture.ja):
                    console.log("結果は " + JSON.stringify(actual) + " でした。");
                    break;
                case (Culture.en):
                default:
                    console.log("The result is " + JSON.stringify(actual) + ".");
                    break;
            }
        };
        ReportingConsole.WriteArgsWithNoExpected = function (args, reason) {
            switch (ReportingConsole.Culture) {
                case (Culture.ja):
                    console.log("引数に " + JSON.stringify(args) + " を指定してメソッドを実行します。");
                    switch (reason) {
                        case (NoExpectedReason.Void):
                            console.log("メソッドに戻り値はないため、期待値はありません。");
                            break;
                        case (NoExpectedReason.ThrowException):
                            console.log("例外がスローされる事が期待されるため、期待値はありません。");
                            break;
                        case (NoExpectedReason.None):
                        default:
                            console.log("期待値はありません。");
                            break;
                    } // end switch
                    break;
                case (Culture.en):
                default:
                    console.log("The method will be called with setting " + JSON.stringify(args) + " as the parameter(s).");
                    switch (reason) {
                        case (NoExpectedReason.Void):
                            console.log("There is no expected value, because the method don't return value.");
                            break;
                        case (NoExpectedReason.ThrowException):
                            console.log("There is no expected value, because it is expected that the exception will be thrown.");
                            break;
                        case (NoExpectedReason.None):
                        default:
                            console.log("There is no expected value.");
                            break;
                    } // end switch
                    break;
            }
        };
        ReportingConsole.WriteNotThrownException = function (actual) {
            switch (ReportingConsole.Culture) {
                case (Culture.ja):
                    console.log("例外がスローされませんでした。");
                    console.log("結果は " + JSON.stringify(actual) + " でした。");
                    break;
                case (Culture.en):
                default:
                    console.log("The expected exception was not thrown actually.");
                    console.log("The result is " + JSON.stringify(actual) + ".");
                    break;
            }
        };
        ReportingConsole.Culture = Culture.en;
        return ReportingConsole;
    }());
    surviveplus.ReportingConsole = ReportingConsole; // end class
    (function (NoExpectedReason) {
        NoExpectedReason[NoExpectedReason["None"] = 0] = "None";
        NoExpectedReason[NoExpectedReason["Void"] = 1] = "Void";
        NoExpectedReason[NoExpectedReason["ThrowException"] = 2] = "ThrowException";
    })(surviveplus.NoExpectedReason || (surviveplus.NoExpectedReason = {}));
    var NoExpectedReason = surviveplus.NoExpectedReason;
})(surviveplus || (surviveplus = {})); // end namespace
$().ready(function () {
    if ($("#unittestplus").length == 0) {
        $("body").append("<div id=\"unittestplus\"><span>Run by:</span> <input type=\"text\" id=\"unittestplus-runby\"> <span>Computer:</span> <input type=\"text\" id=\"unittestplus-computer\"> <button id=\"unittestplus-createTsv\">Create TSV</button><textarea id=\"unittestplus-tsv\"></textarea></div>");
    } //end if
    try {
        $("#unittestplus-runby").val(window.localStorage.getItem("unittestplus-runby"));
        $("#unittestplus-computer").val(window.localStorage.getItem("unittestplus-computer"));
    }
    catch (ex) { }
    $("#unittestplus-createTsv").click(function () {
        var text = "";
        var write = function (values) {
            text += values.join("\t") + "\r\n";
        };
        write([
            "Module",
            "Test Class",
            "Test Name (Title)",
            "Category",
            "Outcome",
            "Console Output (Parameters, Expected result and Actual)",
            "Run by",
            "Computer",
            "Start Time",
            "Elapsed Time",
        ]);
        var EscapeMultilineForTsv = function (value) {
            if (!value) {
                return "";
            }
            else if (value.indexOf("\n") > 0) {
                return "\"" + value.replace(/\"/g, "\"\"").replace(/\r\n/g, "\n") + "\"";
            }
            else {
                return value;
            } // end if
        };
        var runby = $("#unittestplus-runby").val();
        window.localStorage.setItem("unittestplus-runby", runby);
        var computer = $("#unittestplus-computer").val();
        window.localStorage.setItem("unittestplus-computer", computer);
        $("#qunit-tests>li").each(function (index, element) {
            var outcome = $(element).attr("class");
            switch (outcome) {
                case "pass":
                    outcome = "Passed";
                    break;
                case "fail":
                    outcome = "Failed";
                    break;
            } // end switch
            var module = $(element).find(".module-name").text();
            var title = $(element).find(".test-name").text();
            var context = surviveplus.UnitTestPlus.GetTestContext(module, title);
            var output = context.consoleOutput;
            if (!output) {
                output = $(element).find("ol").text();
            } // end if
            write([
                module,
                context.className,
                title,
                "",
                outcome,
                EscapeMultilineForTsv(output.replace(/\s+$/g, "")),
                runby,
                computer,
                context.startTime.toLocaleString(),
                context.GetElapsedTime(),
            ]);
        });
        $("#unittestplus-tsv").text(text).select();
    });
});
