package education.kh.edu.contoller;

import java.util.List;

import education.kh.edu.service.NoticeService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import education.kh.edu.dto.NoticeDto;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class NoticeController {

    private final NoticeService noticeService;

    @RequestMapping(value = "/Notice", method = RequestMethod.GET)
    public List<NoticeDto> NoticeList() {
        return noticeService.NoticeList();
    }
    
}
