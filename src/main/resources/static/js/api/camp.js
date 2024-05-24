$("document").ready(function () {

    var mapContainer = document.getElementById('map'),
        mapOption = {
            center: new kakao.maps.LatLng(37.34936338, 126.7589429),
            level: 3 // 지도의 확대 레벨
        };

    var map = new kakao.maps.Map(mapContainer, mapOption);
    var markers = [];
    var infowindows = [];

    $(".campSearchSubmit").submit(function (event) {
        event.preventDefault()

        var mapSearch = $(".mapSearch").val();

        $.ajax({
            type: "GET",
            url: "/api/campSearch",
            data: {mapSearch: mapSearch},
            success: function (data) {

                console.log(data);

                var rows = JSON.parse(data);

                console.log(rows);

                var positions = [];

                for (var i = 0; i < rows.CAMPGRD[1].row.length; i++) {
                    positions.push({
                        title: rows.CAMPGRD[1].row[i].FACLT_NM,
                        latlng: new kakao.maps.LatLng(rows.CAMPGRD[1].row[i].REFINE_WGS84_LAT, rows.CAMPGRD[1].row[i].REFINE_WGS84_LOGT)
                    });
                }

                var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

                // 기존 마커 및 인포윈도우 제거
                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
                markers = [];

                for (var i = 0; i < infowindows.length; i++) {
                    infowindows[i].close();
                }
                infowindows = [];

                for (var i = 0; i < positions.length; i++) {

                    // 마커 이미지의 이미지 크기 입니다
                    var imageSize = new kakao.maps.Size(24, 35);

                    // 마커 이미지를 생성합니다
                    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                    // 마커를 생성합니다
                    var marker = new kakao.maps.Marker({
                        position: positions[i].latlng, // 마커를 표시할 위치
                        image: markerImage, // 마커 이미지
                        clickable: true
                    });

                    markers.push(marker);

                    // 인포윈도우 내용
                    var iwContent = `<a href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${positions[i].title}" style="padding:5px;" target="_blank">${positions[i].title}</a>`,
                        iwRemoveable = true;

                    var infowindow = new kakao.maps.InfoWindow({
                        content: iwContent,
                        removable: iwRemoveable
                    });

                    infowindows.push(infowindow);

                    // 클로저를 이용한 인포윈도우 생성 및 이벤트 바인딩
                    (function(marker, infowindow) {
                        kakao.maps.event.addListener(marker, 'click', function() {
                            // 모든 인포윈도우 닫기
                            for (var j = 0; j < infowindows.length; j++) {
                                infowindows[j].close();
                            }
                            infowindow.open(map, marker);
                        });
                    })(marker, infowindow);
                }

                // 새로운 마커 표시 및 지도 중심 이동
                var bounds = new kakao.maps.LatLngBounds();
                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(map);
                    bounds.extend(markers[i].getPosition());
                }
                map.setBounds(bounds);

            }, error: function (request, status, error) {
                console.log("code: " + request.status)
                console.log("message: " + request.responseText)
                console.log("error: " + error);
            }

        });

    });

});
