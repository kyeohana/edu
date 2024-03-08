package education.kh.edu.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import education.kh.edu.dto.NoticeDto;
import education.kh.edu.mapper.NoticeMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final NoticeMapper notionMapper;

    @Qualifier("NoticeService")
    public List<NoticeDto> NoticeList() {
        return notionMapper.NoticeList();
    }
    
}
