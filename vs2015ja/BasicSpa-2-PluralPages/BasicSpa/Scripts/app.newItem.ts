$().ready(() => {
    var productItem = ko.observable<Product>(new Product());
    var savedTitle = ko.observable<String>();
       
    ko.applyBindings(productItem, $("#newItem")[0]);
    ko.applyBindings({ savedTitle: savedTitle }, $("#saveItemMessage")[0]);

    $("#newItem .saveButton").click(() => {
         // TODO: ここでWeb API に productItem() を渡してDBに保存します。

        savedTitle(productItem().Title);
        productItem(new Product());
        return false;
    });
});