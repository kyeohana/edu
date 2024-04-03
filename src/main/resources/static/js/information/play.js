$(document).ready(function(){

    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    var yyyymmdd = year + month + day;

    $("#startDate").val(yyyymmdd);
    $("#endDate").val(yyyymmdd);

    $(".play_form").submit(function(event) {
        event.preventDefault();

        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();

        if (!startDate) {
            Swal.fire("시작 날짜를 입력해주세요");
            $("#startDate").addClass("error");
            return false;
        }

        if (startDate) {
            $("#startDate").removeClass("error");
        }

        if (!endDate) {
            Swal.fire("종료 날짜를 입력해주세요");
            $("#endDate").addClass("error");
            return false;
        }

        if (endDate) {
            $("#endDate").removeClass("error");
        }

        if(startDate > endDate) {
            Swal.fire("종료 날짜를 시작 날짜보다 </br> 크거나 같게 해주세요");
            $("#endDate").addClass("error");
            return false;
        }

        var formData = {
            startDate,
            endDate
        };

        $.ajax({
            type: "GET",
            url: "/festivals",
            data: formData,
            success: function(responseXML) {
                var html = "";

                $(responseXML).find("db").each(function() {
                    var mt20id = $(this).find("mt20id").text();
                    var prfnm = $(this).find("prfnm").text();
                    var prfpdfrom = $(this).find("prfpdfrom").text();
                    var prfpdto = $(this).find("prfpdto").text();
                    var fcltynm = $(this).find("fcltynm").text();
                    var poster = $(this).find("poster").text();
                    var area = $(this).find("area").text();
                    var genrenm = $(this).find("genrenm").text();
                    var openrun = $(this).find("openrun").text();
                    var prfstate = $(this).find("prfstate").text();

                    html += "<div class='play_list'>";
                    html += "<img src='" + poster + "' alt='포스터'>";
                    html += "<p>제목: " + prfnm + "</p>";
                    html += "<p>시작 날짜: " + prfpdfrom + "</p>";
                    html += "<p>종료 날짜: " + prfpdto + "</p>";
                    html += "<p>장소: " + fcltynm + "</p>";
                    html += "<p>지역: " + area + "</p>";
                    html += "<p>장르: " + genrenm + "</p>";
                    html += "<p>공연 상태: " + prfstate + "</p>";
                    html += "<p>오픈런 여부: " + openrun + "</p>";
                    html += "</div>";
                });

                $("#performances").html(html);
            },
            error: function(xhr, status, error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
    });
    $(".selector").flatpickr({
        enableTime: false,
        dateFormat: "Ymd",
    });
});
