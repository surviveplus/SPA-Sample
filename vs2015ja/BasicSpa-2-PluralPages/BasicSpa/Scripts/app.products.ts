$().ready(() => {
    var productItem = ko.observable<Product>(new Product());

    var clicked = (item : Product) => {
        productItem(item);
        $('html,body').animate({scrollTop: ($("#productItem").offset().top - $(".navbar-header").height()) }, 'fast');
    };
    var products = ko.observableArray<Product>();

    ko.applyBindings({ "lines": products }, $("#products")[0]);
    ko.applyBindings(productItem, $("#productItem")[0]);

    // TODO: ここで Web API からデータを取得して、products () に設定して表示します。
    products(
        [{ Id: 0, Title: "Visual Studio 2015 Community", Description: "無料の統合開発環境", Publisher: "Microsoft", Price: "FREE", DownloadUrl: null, ProductUrl: "https://www.visualstudio.com/", PublisherUrl: null, Clicked: clicked }
            , { Id: 1, Title: "Em Editor", Description: "高速・軽量なテキストエディタ", Publisher: "Emurasoft", Price: "\\18,000-", DownloadUrl: null, ProductUrl: "https://jp.emeditor.com/", PublisherUrl: null, Clicked: clicked }]);
    //if (products().length > 0) { productItem(products()[0]); }

});