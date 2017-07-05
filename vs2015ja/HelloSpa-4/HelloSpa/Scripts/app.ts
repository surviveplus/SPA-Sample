$().ready(() => {

    $.getJSON(
        "/api/Hello/Hello/" + "?date=" + new Date().getTime(),
        null,
        (data, textStatus, jqXHR) => {

            var text = data;
            $("div").append("<span>" + text + "</span>");
        });

});