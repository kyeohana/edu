$(document).ready(function(){
    $(".play_form").submit(function(event) {
        event.preventDefault();

        var formData = {
            startDate: $("#startDate").val(),
            endDate: $("#endDate").val()
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
