$().ready(function () {
    var productItem = ko.observable(new Product());
    var savedTitle = ko.observable();
    ko.applyBindings(productItem, $("#newItem")[0]);
    ko.applyBindings({ savedTitle: savedTitle }, $("#saveItemMessage")[0]);
    $("#newItem .saveButton").click(function () {
        // TODO: ここでWeb API に productItem() を渡してDBに保存します。
        savedTitle(productItem().Title);
        productItem(new Product());
        return false;
    });
});
//# sourceMappingURL=app.newItem.js.map