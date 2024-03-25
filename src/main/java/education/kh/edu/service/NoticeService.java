package education.kh.edu.service;

import java.util.*;
import education.kh.edu.domain.NoticeDto;

public interface NoticeService {

    public List<NoticeDto> getNoticeList(int page, int itemsPerPage) throws Exception;

    public void boardWrite(NoticeDto vo) throws  Exception;

    public void boardViewCnt(int id) throws  Exception;

    public List<NoticeDto> boardWriteDetail(int id) throws Exception;

    public List<NoticeDto> answerDetail(int id) throws Exception;

    public void answerWrite(NoticeDto nd) throws Exception;

    public void noticeDelete(NoticeDto nd) throws Exception;

}