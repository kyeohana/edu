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

    @GetMapping("/board/notice_write")
    public String noticeWriteHtml() {
        return "board/notice_write";
    }

    @GetMapping("/login/login")
    public String loginHtml() {
        return "login/login";
    }

    @GetMapping("/include/footer")
    public String footerHtml() {
        return "include/footer";
    }

}
