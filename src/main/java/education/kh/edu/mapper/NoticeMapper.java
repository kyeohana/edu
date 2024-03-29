package education.kh.edu.mapper;

import java.util.*;
import org.apache.ibatis.annotations.Mapper;
import education.kh.edu.domain.NoticeDto;

@Mapper
public interface NoticeMapper {

    public List<NoticeDto> getNoticeList(int itemsPerPage, int offset, String title_search) throws Exception;

    public void boardWrite(NoticeDto vo) throws Exception;

    public void boardViewCnt(int id) throws Exception;

    public List<NoticeDto> boardWriteDetail(int id) throws Exception;

    public List<NoticeDto> answerDetail(int id) throws Exception;

    public void answerWrite(NoticeDto nd) throws Exception;

    public void noticeDelete(NoticeDto nd) throws Exception;

}