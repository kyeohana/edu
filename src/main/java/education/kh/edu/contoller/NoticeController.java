package education.kh.edu.contoller;

import education.kh.edu.domain.NoticeDto;
import education.kh.edu.service.NoticeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/board/notice")
public class NoticeController {

    private static final Logger logger = LoggerFactory.getLogger(NoticeController.class);

    @Autowired
    private NoticeService noticeService;

    @GetMapping("/list")
    @ResponseBody
    public ResponseEntity<?> getNoticeList(@RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "10") int itemsPerPage,
                                           @RequestParam String title_search) {
        try {
            return ResponseEntity.ok().body(noticeService.getNoticeList(page, itemsPerPage, title_search));
        } catch (Exception e) {
            logger.error("Error occurred while retrieving notice list: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve notice list");
        }
    }

    @GetMapping("/write")
    public String boardWrite(NoticeDto vo, RedirectAttributes rttr) throws Exception {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loginId = authentication.getName();
        vo.setUser_id(loginId);

        noticeService.boardWrite(vo);

        rttr.addFlashAttribute("msg","write" );

        return "redirect:/board/notice";
    }

    @GetMapping("/view_count")
    public ResponseEntity<?> boradViewCnt (@RequestParam int id) {
        try {
            noticeService.boardViewCnt(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to increase view count.");
        }
    }

    @GetMapping("/writedetail")
    public ResponseEntity<?> boardWriteDetail (@RequestParam int id) {
        try {
            return ResponseEntity.ok().body(noticeService.boardWriteDetail(id));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed");
        }
    }

    @GetMapping("/listAnswer")
    public ResponseEntity<?> answerDetail (@RequestParam int id ){
        try{
            return ResponseEntity.ok().body(noticeService.answerDetail(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("failed");
        }
    }

    @GetMapping("/listAnswerWrite")
    public String answerWrite (NoticeDto nd, RedirectAttributes redirectAttributes) throws Exception {

        noticeService.answerWrite(nd);

        redirectAttributes.addAttribute("noticeId", nd.getNum());

        return "redirect:/board/notice_detail";
    }

    @GetMapping("/delete")
    public String noticeDelete (NoticeDto nd) throws Exception {

        noticeService.noticeDelete(nd);

        return "redirect:/board/notice";

    }


}