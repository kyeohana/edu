package education.kh.edu.contoller;

import java.util.List;

import education.kh.edu.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import education.kh.edu.domain.NoticeDto;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/edu/board")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @RequestMapping(value = "/notice", method = RequestMethod.GET)
    public void NoticeList() throws Exception {
    }
    
}
