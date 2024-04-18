$("document").ready(function () {
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

    var slideMenu = $("#slideMenu");

    var slideMenuHtml=
        '<div class="slideMenuBox">' +
            '<a href="#" class="slideMenuSt">메뉴' +
                '<div class="slideDtnBtn">' +
                    '<span class="material-symbols-outlined">' +
                    'keyboard_arrow_down' +
                    '</span>' +
                '</div>' +
                '<div class="slideDtnBtn_2">' +
                    '<span class="material-symbols-outlined">' +
                    'keyboard_arrow_up' +
                    '</span>' +
                '</div>' +
                '</a>' +
                    '<div class="slideMenu_Fst_None">메인</div>' +
                    '<div class="slideMenu_Fst_None">자유게시판</div>' +
                '<a href="#" class="slideMenuSt">정보' +
                '<div class="slideDtnBtn">' +
                    '<span class="material-symbols-outlined">' +
                    'keyboard_arrow_down' +
                    '</span>' +
                '</div>' +
                '<div class="slideDtnBtn_2">' +
                    '<span class="material-symbols-outlined">' +
                    'keyboard_arrow_up' +
                    '</span>' +
                '</div>' +

                '</a>' +
                    '<div class="slideMenu_Snd_None">메인</div>' +
                    '<div class="slideMenu_Snd_None">자유게시판</div>' +
                '<a href="#" class="slideMenuSt">미등록' +
                '<div class="slideDtnBtn">' +
                    '<span class="material-symbols-outlined">' +
                    'keyboard_arrow_down' +
                    '</span>' +
                '</div>' +
                '<div class="slideDtnBtn_2">' +
                    '<span class="material-symbols-outlined">' +
                    'keyboard_arrow_up' +
                    '</span>' +
                '</div>' +
            '</a>' +
        '</div>'

    slideMenu.html(slideMenuHtml);

});




function popularity_button() {

    $.ajax({
        url: "/location/populartiy",
        type: "GET",
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            var data = response.data;
            var popularityContent = "";
            for (var i = 0; i < Object.keys(data).length; i++) {
                var keywordService = data[i].keyword_service.replace(/<br\s*\/?>/gi, '');
                popularityContent += '<div>' + (i + 1) + '.' + keywordService + '</div>';
            }

            var popularityUptDtn = '<div>' + response.update_dtm + '</div>'

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