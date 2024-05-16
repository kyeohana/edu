package education.kh.edu.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class CampController {

    @Value("${kakao.map.api.key}")
    private String kakaoMapKeyApi;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/api/campMap")
    public String getKakaoMapKeyApi() {

        return kakaoMapKeyApi;

    };


    @GetMapping("/api/campSearch")
    public String getMapSearch(@RequestParam String mapSearch) {

        //https://data.gg.go.kr/portal/data/service/selectServicePage.do?page=2&rows=10&sortColumn=VIEW_CNT&sortDirection=DESC&infId=6243I631A7C7L7M0JR1B21715119&infSeq=3&order=3&loc=

        final String apiKey = "4c754fcc7bce4051b48b3fd84e606fc5";

        String apiUrl = "https://openapi.gg.go.kr/CAMPGRD" +
                "?Key=" + apiKey +
                "&Type=json" +
                "&SIGUN_NM=" + mapSearch ;

        return restTemplate.getForObject(apiUrl,String.class);

    };
}
