package education.kh.edu.contoller;

import education.kh.edu.service.NoticeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/board")
public class NoticeController {

    private static final Logger logger = LoggerFactory.getLogger(NoticeController.class);


    @Autowired
    private NoticeService noticeService;

    @RequestMapping(value = "/notice", method = RequestMethod.GET)
    public String getNoticeList(Model model) throws Exception {

        model.addAttribute("notices", noticeService.getNoticeList());

        return "board/notice";

    }
    
}
