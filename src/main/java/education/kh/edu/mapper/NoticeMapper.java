package education.kh.edu.mapper;

import java.util.*;
import org.apache.ibatis.annotations.Mapper;
import education.kh.edu.domain.NoticeDto;

@Mapper
public interface NoticeMapper {

    public List<NoticeDto> NoticeList() throws Exception;
}
