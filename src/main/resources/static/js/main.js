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
            '<a href="#" class="slideMenuSt" id="slideMenuSt_1">메뉴' +
                '<div class="slideDtnBtn_Menu">' +
                    '<span class="material-symbols-outlined">' +
                    'keyboard_arrow_down' +
                    '</span>' +
                '</div>' +
                '<div class="slideDtnBtn_Menu_2">' +
                    '<span class="material-symbols-outlined">' +
                    'keyboard_arrow_up' +
                    '</span>' +
                '</div>' +
            '</a>' +
                '<div class="slideMenuSub" id="slideMenu_Fst_None">메인</div>' +
                '<div class="slideMenuSub" id="slideMenu_Fst_None">자유게시판</div>' +
            '<a href="#"  class="slideMenuSt" id="slideMenuSt_2">정보' +
                '<div class="slideDtnBtn_Sub">' +
                    '<span class="material-symbols-outlined">' +
                    'keyboard_arrow_down' +
                    '</span>' +
                '</div>' +
                '<div class="slideDtnBtn_Sub_2">' +
                    '<span class="material-symbols-outlined">' +
                    'keyboard_arrow_up' +
                    '</span>' +
                '</div>' +
            '</a>' +
                '<div class="slideMenuSub" id="slideMenu_Snd_None">위치</div>' +
                '<div class="slideMenuSub" id="slideMenu_Snd_None">축제</div>' +
            '<a href="#"  class="slideMenuSt" id="slideMenuSt_3">미등록' +
                '<div class="slideDtnBtn_trd">' +
                    '<span class="material-symbols-outlined">' +
                    'keyboard_arrow_down' +
                    '</span>' +
                '</div>' +
                '<div class="slideDtnBtn_trd_2">' +
                    '<span class="material-symbols-outlined">' +
                    'keyboard_arrow_up' +
                    '</span>' +
                '</div>' +
        '</a>' +
                '<div class="slideMenuSub" id="slideMenu_Trd_None">미등록</div>' +
                '<div class="slideMenuSub" id="slideMenu_Trd_None">미등록</div>' +
        '</div>'

    slideMenu.html(slideMenuHtml);

    var slideMenuSt_1 = true
    var slideMenuSt_2 = true
    var slideMenuSt_3 = true

    $(".slideDtnBtn_Menu_2, .slideDtnBtn_Sub_2, .slideDtnBtn_trd_2").hide();
    $("#slideMenu_Fst_None, #slideMenu_Snd_None, #slideMenu_Trd_None").hide();


    $("#slideMenuSt_1").click(function (event) {
        if(slideMenuSt_1) {
            $(".slideDtnBtn_Menu").hide();
            $(".slideDtnBtn_Sub, .slideDtnBtn_trd, .slideDtnBtn_Menu_2, #slideMenu_Fst_None").show();
            $(".slideDtnBtn_Sub_2, .slideDtnBtn_trd_2, #slideMenu_Snd_None, #slideMenu_Trd_None").hide();

            slideMenuSt_1 = false;
            slideMenuSt_2 = true;
            slideMenuSt_3 = true;
    } else {
            $(".slideDtnBtn_Menu").show();
            $(".slideDtnBtn_Menu_2, #slideMenu_Fst_None").hide();

            slideMenuSt_1 = true;
    }});

    $("#slideMenuSt_2").click(function (event) {
        if(slideMenuSt_2) {
            $(".slideDtnBtn_Sub").hide();
            $(".slideDtnBtn_Menu, .slideDtnBtn_trd,.slideDtnBtn_Sub_2, #slideMenu_Snd_None").show();
            $(".slideDtnBtn_Menu_2,.slideDtnBtn_trd_2, #slideMenu_Fst_None, #slideMenu_Trd_None").hide();

            slideMenuSt_1 = true;
            slideMenuSt_2 = false;
            slideMenuSt_3 = true;
        } else {
            $(".slideDtnBtn_Sub").show();
            $(".slideDtnBtn_Sub_2, #slideMenu_Snd_None").hide();

            slideMenuSt_2 = true;
        }});

    $("#slideMenuSt_3").click(function (event) {
        if(slideMenuSt_3) {
            $(".slideDtnBtn_trd").hide();
            $(".slideDtnBtn_Menu, .slideDtnBtn_Sub, .slideDtnBtn_trd_2, #slideMenu_Trd_None").show();
            $(".slideDtnBtn_Menu_2, .slideDtnBtn_Sub_2, #slideMenu_Fst_None, #slideMenu_Snd_None").hide();

            slideMenuSt_1 = true;
            slideMenuSt_2 = true;
            slideMenuSt_3 = false;
        } else {
            $(".slideDtnBtn_trd").show();
            $(".slideDtnBtn_trd_2, #slideMenu_Trd_None").hide();

            slideMenuSt_3 = true;
        }});

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