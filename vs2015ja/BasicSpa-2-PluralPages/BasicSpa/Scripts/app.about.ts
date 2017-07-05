$().ready(() => {
    
    var about = { Title: "BASIC SPA SAMPLE", Version : ko.observable<string>("(取得中)") };
    ko.applyBindings(about, $("#about")[0]);

    // TODO: ここで Web API からバージョンを取得して、about.Version() に設定して表示を更新します。
    about.Version("1.0 (Offline DEMO)");
});