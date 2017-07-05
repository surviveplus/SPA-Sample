var _this = this;
var Product = (function () {
    function Product() {
        this.Id = 0;
        this.Title = null;
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
    var lastKeyword;
    var search = function (keyword) {
        if (lastKeyword == keyword)
            return;
        lastKeyword = keyword;
        var targets = Enumerable.From(products());
        targets.ForEach(function (item, i) {
            item.Searched(false);
        });
        var contains = function (text, keyword) {
            return (text ? text.indexOf(keyword) >= 0 : false);
        };
        var keywords = $("#keywords").val();
        if (keywords != "" && keywords) {
            keywords.split(" ").forEach(function (keyword, i, a) {
                targets = targets.Where(function (item, index) {
                    return (contains(item.Title, keyword) ||
                        contains(item.Description, keyword) ||
                        contains(item.Publisher, keyword));
                });
            });
        }
        targets.ForEach(function (item, i) {
            item.Searched(true);
        });
    };
    $("#keywords").change(function (e) {
        var changed = $(e.target);
        _this.Search(changed.val());
    });
    var searchTimerToken = setInterval(function () {
        search($("#keywords").val());
    }, 600);
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
                value.Searched = ko.observable(true);
            });
            products(items);
        });
        return false;
    });
    //
    // New Item ページを表示するための処理
    //
    var newItem = ko.observable(new Product());
    var savedTitle = ko.observable();
    ko.applyBindings(newItem, $("#newItem")[0]);
    ko.applyBindings({ savedTitle: savedTitle }, $("#saveItemMessage")[0]);
    $("#newItem .saveButton").click(function () {
        var item = newItem();
        // ここでWeb API に newItem() を渡してDBに保存します。
        $.post("api/SaveProduct", item)
            .done(function (result) {
            if (result.success) {
                // 保存に成功したときにメッセージを表示します。
                savedTitle(item.Title);
                newItem(new Product());
            }
            else {
                alert("error");
            } // end if
        }).fail(function (result) {
            alert("error");
        });
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
