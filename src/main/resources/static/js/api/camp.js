$("document").ready(function () {

    // id가 map인 것을 찾아 mapContainer로 받음
    let mapContainer = $('#map')[0]  ,

        // 최초 짖도의 중심좌표, 레벨 등을 지정
        mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };

    // 카카오 맵을 띄움
    let map = new kakao.maps.Map(mapContainer, mapOption);

})
