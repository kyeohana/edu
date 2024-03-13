$("document").ready(function () {
    var header = $("header");
    var sections = $("section > ul > li");
    var headerHovered = false;
    var tableBody = $('#body-list tbody')

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

    $.ajax({
        url: '/board/notice/list',
        type : 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);

            var notices = data;
            var tableBody = $('.board-table tbody');

            tableBody.empty();

            if (notices && notices.length > 0) {
                for (var i = 0; i < notices.length; i++) {
                    var notice = notices[i];
                    var formattedDate = new Date(notice.cre_date).toISOString().split('T')[0];
                    var row = '<tr>' +
                        '<td>' + notice.num + '</td>' +
                        '<td><a href="/board/notice_detail.html">' + notice.title + '</a></td>' +
                        '<td>' + formattedDate + '</td>' +
                        '<td>' + notice.view_cnt + '</td>' +
                        '</tr>';
                    tableBody.append(row);
                }
            } else {
                var noDataRow = '<tr>' +
                    '<td colspan="4">조회된 데이터가 없습니다</td>' +
                    '</tr>';
                tableBody.append(noDataRow);
            }
        },
        error: function(error){
            console.error('error balsang :', error);
            }
        }

    )

});