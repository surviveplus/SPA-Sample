$().ready(() => {
    $("button").click(() => {

        $.getJSON(
            "/api/Hello/Hello/" + "?date=" + new Date().getTime(),
            null,
            (data, textStatus, jqXHR) => {

                var text = data;
                $("div span").remove();
                $("div").append("<span>" + text + "</span>");
            });
    });
});