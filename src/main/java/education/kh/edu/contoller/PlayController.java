package education.kh.edu.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class PlayController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/festivals")
    public String getFestivals(
            @RequestParam String startDate,
            @RequestParam String endDate) {

        // https://www.kopis.or.kr/por/cs/openapi/openApiInfo.do?menuId=MNU_00074
        final String apiKey = "651177a8ae104e98bf996f2cdee25e61";

        String apiUrl = "http://www.kopis.or.kr/openApi/restful/pblprfr" +
                "?service=" + apiKey +
                "&stdate=" + startDate +
                "&eddate=" + endDate +
                "&cpage=1" +
                "&rows=100" +
                "&prfstate=02" +
                "&signgucode=11" +
                "&signgucodesub=1111" +
                "&kidstate=Y" +
                "&newsql=Y";

        return restTemplate.getForObject(apiUrl, String.class);
    }
}