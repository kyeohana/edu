$("document").ready(function () {


    var mapContainer = document.getElementById('map'),
        mapOption = {
            center: new kakao.maps.LatLng(37.34936338, 126.7589429),
            level: 3 // 지도의 확대 레벨
        };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    $(".campSearchSubmit").submit(function (event) {
        event.preventDefault()

        var mapSearch = $(".mapSearch").val();

        $.ajax({
            type: "GET",
            url: "/api/campSearch",
            data: {mapSearch: mapSearch},
            success: function (data) {
                console.log(data)

                var rows = JSON.parse(data)

                console.log(rows);

                var positions = [];

                for (var i = 0; i < rows.CAMPGRD[1].row.length; i++) {
                    positions.push({
                        title: rows.CAMPGRD[1].row[i].FACLT_NM,
                        latlng: new kakao.maps.LatLng(rows.CAMPGRD[1].row[i].REFINE_WGS84_LAT, rows.CAMPGRD[1].row[i].REFINE_WGS84_LOGT)
                    });
                }

                var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

                for (var i = 0; i < positions.length; i ++) {

                    // 마커 이미지의 이미지 크기 입니다
                    var imageSize = new kakao.maps.Size(24, 35);

                    // 마커 이미지를 생성합니다
                    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                    // 마커를 생성합니다
                    var marker = new kakao.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        position: positions[i].latlng, // 마커를 표시할 위치
                        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        image : markerImage // 마커 이미지
                    });
                }



            }, error: function (request, status, error) {
                console.log("code: " + request.status)
                console.log("message: " + request.responseText)
                console.log("error: " + error);
            }

        })

    })

});




