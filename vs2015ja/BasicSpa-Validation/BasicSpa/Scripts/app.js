/// <reference path="typings/knockout.validation/knockout.validation.d.ts" />
var Product = (function () {
    function Product() {
        this.Id = 0;
        this.Title = ko.observable("").extend({ required: { message: '* 必須' } });
        this.Description = null;
        this.Publisher = null;
        this.Price = null;
        this.DownloadUrl = null;
        this.ProductUrl = null;
        this.PublisherUrl = null;
        this.Clicked = null;
    }
    return Product;
}());
$().ready(function () {
    //
    // Home ページを表示するための処理
    //
    $(".openHome").click(function () {
        $(".spaPageContent").hide();
        $("#homePage").show();
        return false;
    });
    // 最初に Home を表示します。
    $(".openHome").click();
    //
    // Products ページを表示するための処理
    //
    var productItem = ko.observable(new Product());
    var clicked = function (item) {
        productItem(item);
        $('html,body').animate({ scrollTop: ($("#productItem").offset().top - $(".navbar-header").height()) }, 'fast');
    };
    var products = ko.observableArray();
    ko.applyBindings({ "lines": products }, $("#products")[0]);
    ko.applyBindings(productItem, $("#productItem")[0]);
    $(".openProducts").click(function () {
        $(".spaPageContent").hide();
        $("#productsPage").show();
        // TODO: ここで Web API からデータを取得して、products () に設定して表示します。
        //if (products().length == 0) {
        //    products(
        //        [{ Id: 0, Title: "Visual Studio 2015 Community", Description: "無料の統合開発環境", Publisher: "Microsoft", Price: "FREE", DownloadUrl: null, ProductUrl: "https://www.visualstudio.com/", PublisherUrl: null, Clicked: clicked }
        //            , { Id: 1, Title: "Em Editor", Description: "高速・軽量なテキストエディタ", Publisher: "Emurasoft", Price: "\\18,000-", DownloadUrl: null, ProductUrl: "https://jp.emeditor.com/", PublisherUrl: null, Clicked: clicked }]);
        //}
        //if (products().length > 0) { productItem(products()[0]); }
        var uri = "api/Products/?date=" + new Date().getTime();
        $.getJSON(uri).done(function (data) {
            var items = data;
            items.forEach(function (value, index, array) {
                value.Clicked = clicked;
            });
            products(items);
        });
        return false;
    });
    //
    // New Item ページを表示するための処理
    //
    var newItem = ko.observable(new Product());
    //var newItem = ko.validatedObservable(new Product());
    var savedTitle = ko.observable();
    ko.applyBindings(newItem, $("#newItem")[0]);
    ko.applyBindings({ savedTitle: savedTitle }, $("#saveItemMessage")[0]);
    var validItem = function () {
        newItem().Title.notifySubscribers();
    };
    validItem();
    //newItem.notifySubscribers();
    $("#newItem .saveButton").click(function () {
        var item = newItem();
        if (item.Title.isValid()) {
            //if (newItem.isValid()) {
            // ここでWeb API に newItem() を渡してDBに保存します。
            $.post("api/SaveProduct", item)
                .done(function (result) {
                if (result.success) {
                    // 保存に成功したときにメッセージを表示します。
                    savedTitle(item.Title());
                    //newItem(new Product());
                    item.Title("");
                }
                else {
                    alert("error");
                } // end if
            }).fail(function (result) {
                alert("error");
            });
        }
        else {
            validItem();
        } // end if
        return false;
    });
    $(".openNewItem").click(function () {
        $(".spaPageContent").hide();
        $("#newItemPage").show();
        savedTitle(null);
        return false;
    });
    //
    // About ページを表示するための処理
    //
    var about = { Title: "BASIC SPA SAMPLE", Version: ko.observable("(取得中)") };
    ko.applyBindings(about, $("#about")[0]);
    $(".openAbout").click(function () {
        $(".spaPageContent").hide();
        $("#aboutPage").show();
        // TODO: ここで Web API からバージョンを取得して、about.Version() に設定して表示を更新します。
        about.Version("1.0 (Offline DEMO)");
        return false;
    });
});
//# sourceMappingURL=app.js.map