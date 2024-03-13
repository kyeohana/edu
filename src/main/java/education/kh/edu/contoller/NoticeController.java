package education.kh.edu.contoller;

import education.kh.edu.domain.NoticeDto;
import education.kh.edu.service.NoticeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/board")
public class NoticeController {

    private static final Logger logger = LoggerFactory.getLogger(NoticeController.class);

    @Autowired
    private NoticeService noticeService;

    @GetMapping("/notice/list")
    @ResponseBody
    public ResponseEntity<?> getNoticeList() {
        try {
            return ResponseEntity.ok().body(noticeService.getNoticeList());
        } catch (Exception e) {
            logger.error("Error occurred while retrieving notice list: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve notice list");
        }
    }

    @GetMapping("/notice/write")
    public String boardWrite(NoticeDto vo, RedirectAttributes rttr) throws Exception {
        logger.info("입력데이터 :" + vo);

        noticeService.boardWrite(vo);

        rttr.addFlashAttribute("msg","write" );

        return "redirect:/board/notice.html";
    }

}