package education.kh.edu.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import education.kh.edu.domain.NoticeDto;
import education.kh.edu.mapper.NoticeMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    private NoticeMapper noticeMapper;

    @Override
    public List<NoticeDto> getNoticeList() throws Exception {
        return noticeMapper.getNoticeList();
    }

    @Override
    public void boardWrite(NoticeDto vo) throws Exception{
        noticeMapper.boardWrite(vo);

    }

    public void boardViewCnt(int id) throws Exception{
        noticeMapper.boardViewCnt(id);
    }

    public List<NoticeDto> boardWriteDetail(int id) throws Exception{
        return noticeMapper.boardWriteDetail(id);
    }

    public List<NoticeDto> answerDetail(int id) throws Exception{
        return noticeMapper.answerDetail(id);
    }
}
