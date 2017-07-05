﻿class Product {
    Id: number = 0;
    Title: string = null;
    Description: string = null;
    Publisher: string = null;
    Price: string = null;
    DownloadUrl: string = null;
    ProductUrl: string = null;
    PublisherUrl: string = null;
    Clicked: KnockoutBindingHandler = null;
}

$().ready(() => {
    //
    // Home ページを表示するための処理
    //
    $(".openHome").click(() => {
        $(".spaPageContent").hide();
        $("#homePage").show();
        return false;
    });
    // 最初に Home を表示します。
    $(".openHome").click();

    //
    // Products ページを表示するための処理
    //
    var productItem = ko.observable<Product>(new Product());

    var clicked = (item: Product) => {
        productItem(item);
        $('html,body').animate({ scrollTop: ($("#productItem").offset().top - $(".navbar-header").height()) }, 'fast');
    };
    var products = ko.observableArray<Product>();

    ko.applyBindings({ "lines": products }, $("#products")[0]);
    ko.applyBindings(productItem, $("#productItem")[0]);

    $(".openProducts").click(() => {
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
        $.getJSON(uri).done((data) => {
            var items = data as Array<Product>;
            items.forEach((value, index, array) => {
                value.Clicked = clicked;
            });
            products(items);
        });

        return false;
    });

    //
    // New Item ページを表示するための処理
    //
    var newItem = ko.observable<Product>(new Product());
    var savedTitle = ko.observable<String>();
    ko.applyBindings(newItem, $("#newItem")[0]);
    ko.applyBindings({ savedTitle: savedTitle }, $("#saveItemMessage")[0]);

    $("#newItem .saveButton").click(() => {
        var item = newItem();

        // ここでWeb API に newItem() を渡してDBに保存します。
        $.post("api/SaveProduct", item)
            .done((result) => {
                if (result.success) {
                    // 保存に成功したときにメッセージを表示します。
                    savedTitle(item.Title);
                    newItem(new Product());
                } else {
                    alert("error");
                } // end if
            }).fail((result) => {
                alert("error");
            });

        return false;
    });

    $(".openNewItem").click(() => {
        $(".spaPageContent").hide();
        $("#newItemPage").show();
        savedTitle(null);
        return false;
    });

    //
    // About ページを表示するための処理
    //
    var about = { Title: "BASIC SPA SAMPLE", Version: ko.observable<string>("(取得中)") };
    ko.applyBindings(about, $("#about")[0]);

    $(".openAbout").click(() => {
        $(".spaPageContent").hide();
        $("#aboutPage").show();

        // TODO: ここで Web API からバージョンを取得して、about.Version() に設定して表示を更新します。
        about.Version("1.0 (Offline DEMO)");

        return false;
    });

});