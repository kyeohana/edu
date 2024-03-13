package education.kh.edu.mapper;

import java.util.*;
import org.apache.ibatis.annotations.Mapper;
import education.kh.edu.domain.NoticeDto;

@Mapper
public interface NoticeMapper {

    public List<NoticeDto> getNoticeList() throws Exception;

    public void boardWrite(NoticeDto vo) throws Exception;

}