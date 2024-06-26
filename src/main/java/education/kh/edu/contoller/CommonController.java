package education.kh.edu.contoller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CommonController {

    @GetMapping("/main")
    public String mainHtml() {
        return "main";
    }

    @GetMapping("/board/notice")
    public String noticeHtml() {
        return "board/notice";
    }

    @GetMapping("/board/notice_detail")
    public String noticeDetailHtml() {
        return "board/notice_detail";
    }

    @GetMapping("/login/login")
    public String loginHtml() {
        return "login/login";
    }

    @GetMapping("/login/register")
    public String registerHtml() {
        return "login/register";
    }

    @GetMapping("/include/footer")
    public String footerHtml() {
        return "include/footer";
    }

    @GetMapping("/information/location")
    public String locationHtml() {
        return "information/location";
    }

    @GetMapping("/information/play")
    public String playHtml() {
        return "information/play";
    }

    @GetMapping("/api/camp")
    public String campHtml() {
        return "api/camp";
    }

}
