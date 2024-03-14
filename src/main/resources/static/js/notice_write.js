$("document").ready(function () {
    var header = $("header");
    var headerHovered = false;

    $(".header_container").load("/include/header.html");
    $(".footer-container").load("/include/footer.html");

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

    $("#write-form").submit(function(event) {
        event.preventDefault()

        var con = confirm("등록하시겠습니까?")

        if(con){
            alert("등록이 완료 되었습니다.");
            this.submit();
        }

    })


});