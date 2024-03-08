package education.kh.edu.mapper;

import java.util.*;
import org.apache.ibatis.annotations.Mapper;
import education.kh.edu.dto.NoticeDto;

@Mapper
public interface NoticeMapper {

    List<NoticeDto> NoticeList();
}
