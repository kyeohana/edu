$("document").ready(function () {
    var header = $("header");
    var sections = $("section > ul > li");
    var headerHovered = false;

    $(".header_container").load("/include/header.html");

    $(".banner > .banner2 > li").mouseenter(function () {
        header.stop().animate({ height: "220px" }, 500);
    }).mouseleave(function () {
        setTimeout(function () {
            if (!headerHovered) {
                header.stop().animate({ height: "66px" }, 500);
                $(".banner > .banner2 > li > ul").hide();
            }
        }, 10);
    });

    header.mouseenter(function () {
        headerHovered = true;
        header.stop().animate({ height: "220px" }, 500);
        $(".banner > .banner2 > li > ul").show();
    }).mouseleave(function () {
        headerHovered = false;
        setTimeout(function () {
            if (!headerHovered) {
                header.stop().animate({ height: "66px" }, 500);
                $(".banner > .banner2 > li > ul").hide();
            }
        }, 10);
    });

    function checkScroll() {
        var windowHeight = $(window).height();
        var scrollPostion = $(window).scrollTop();

        sections.each(function() {
            var offset = $(this).offset().top;
            
            if (scrollPostion + windowHeight >= offset) {
                $(this).addClass("active");
            }
        });
    };

    $(window).scroll(function () {
        checkScroll();
    });

});