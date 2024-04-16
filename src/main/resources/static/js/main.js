$("document").ready(function () {
    var header = $("header");
    var sections = $("section > ul > li");

    $(".header_container").load("/include/header");
    $(".footer-container").load("/include/footer");

    var swiper = new Swiper(".mySwiper", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay : {
            delay : 3000, 
            disableOnInteraction : false, 
        },
        speed:2000,
        loop: true,
        loopAdditionalSlides: 1,
    });

    header.mouseenter(function () {
        header.stop().animate({ height: "220px" }, 500);
        $(".banner2 > ul").show();
    }).mouseleave(function () {
        setTimeout(function () {
                header.stop().animate({ height: "86px" }, 500);
                $(".banner2 > ul").hide();
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

    $(".popularityClose").click(function (event) {
        event.preventDefault()

        $(".popularity").hide();
        $(".popularity").removeClass("show");
        $(".popularityUptDtn").hide();
        $(".popularityClose").hide();

    })

    $(".popularityClose").hide();

});


function popularity_button() {

    $.ajax({
        url: "/location/populartiy",
        type : "GET",
        dataType: "JSON",
        success: function(response){
            console.log(response);
            var data = response.data;
            var popularityContent = "";
            for (var i = 0; i < Object.keys(data).length; i++) {
                var keywordService = data[i].keyword_service.replace(/<br\s*\/?>/gi, '');
                popularityContent += '<div>' + (i + 1)+ '.' +  keywordService + '</div>';
            }

            var popularityUptDtn = '<div>'+ response.update_dtm +'</div>'

            $(".popularity").show()
            $(".popularity").addClass("show");
            $(".popularityUptDtn").show();
            $(".popularityClose").show();


            $(".popularityUptDtn").html(popularityUptDtn);
            $(".popularity").html(popularityContent);
        },
        error() {
            alert("인기 검색어 불러오기 중 에러발생")
        }

    });
}