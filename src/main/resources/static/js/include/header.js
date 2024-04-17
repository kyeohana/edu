$(document).ready(function () {
    var slideMenu = $("#slideMenu");
    var body = $(".overlay");
    var header = $("header");
    var headerList = $(".banner2");


    $('.menuButton').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        body.addClass("overlayer");

        setTimeout(function () {
            var isVisible = slideMenu.css('right') == '0px';
            var newRight = isVisible ? '-36.3%' : '0px';
            slideMenu.animate({ right: newRight }, 100);
            slideMenu.addClass("white");
        }, 200);

    });

    $(document).click(function(event) {
        if (slideMenu.css('right') == '0px' && !$(event.target).closest('#slideMenu').length) {
            slideMenu.animate({ right: '-36.3%' }, 100);
            body.removeClass("overlayer");
        }
    });

    headerList.mouseenter(function () {
        header.stop().animate({ height: "220px" }, 300);
        $(".banner2 > ul").show();
    }).mouseleave(function () {
        setTimeout(function () {
            header.stop().animate({ height: "86px" }, 300);
            $(".banner2 > ul").hide();
        }, 10);
    });
});