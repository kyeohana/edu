package education.kh.edu.service;

import java.util.*;
import education.kh.edu.domain.NoticeDto;

public interface NoticeService {

    public List<NoticeDto> getNoticeList() throws Exception;

    public void boardWrite(NoticeDto vo) throws  Exception;
    
}