$("document").ready(function () {


    var mapContainer = document.getElementById('map'),
        mapOption = {
            center: new kakao.maps.LatLng(37.34936338, 126.7589429),
            level: 3
        };

    var map = new kakao.maps.Map(mapContainer, mapOption);
    var markers = [];
    var infowindows = [];

    $(".campSearchSubmit").submit(function (event) {
        event.preventDefault()

        var mapSearch = $(".mapSearch").val();

        if(!mapSearch) {
            Swal.fire({
                icon: 'error',
                title: '검색어를 입력해주세요.',
                showConfirmButton: false,
                timer: 1500
            });
            return false;
        }

        $(".loading-overlay").show();

        $.ajax({
            type: "GET",
            url: "/api/campSearch",
            data: {mapSearch: mapSearch},
            success: function (data) {

                $(".loading-overlay").hide();

                var rows = JSON.parse(data);

                var positions = [];

                for (var i = 0; i < rows.CAMPGRD[1].row.length; i++) {
                    positions.push({
                        title: rows.CAMPGRD[1].row[i].FACLT_NM,
                        latlng: new kakao.maps.LatLng(rows.CAMPGRD[1].row[i].REFINE_WGS84_LAT, rows.CAMPGRD[1].row[i].REFINE_WGS84_LOGT)
                    });
                }

                var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
                markers = [];

                for (var i = 0; i < infowindows.length; i++) {
                    infowindows[i].close();
                }
                infowindows = [];

                for (var i = 0; i < positions.length; i++) {

                    var imageSize = new kakao.maps.Size(24, 35);

                    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                    var marker = new kakao.maps.Marker({
                        position: positions[i].latlng, // 마커를 표시할 위치
                        image: markerImage, // 마커 이미지
                        clickable: true
                    });

                    markers.push(marker);

                    var iwContent = `<a href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${positions[i].title}" style="padding:5px;" target="_blank">${positions[i].title}</a>`,
                        iwRemoveable = true;

                    var infowindow = new kakao.maps.InfoWindow({
                        content: iwContent,
                        removable: iwRemoveable
                    });

                    infowindows.push(infowindow);

                    (function(marker, infowindow) {
                        kakao.maps.event.addListener(marker, 'click', function() {
                            for (var j = 0; j < infowindows.length; j++) {
                                infowindows[j].close();
                            }
                            infowindow.open(map, marker);
                        });
                    })(marker, infowindow);
                }

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
