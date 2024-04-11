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
                header.stop().animate({ height: "66px" }, 500);
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
            var dataUpdateTime = response.update_dtm;
            for (var i = 0; i < Object.keys(data).length; i++) {
                popularityContent += '<div>' + (i + 1)+ '.' +  data[i].keyword_name + '</div>';
            }
            $(".popularity").html(popularityContent);
        },

    });
}