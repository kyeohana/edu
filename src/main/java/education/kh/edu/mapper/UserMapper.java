package education.kh.edu.mapper;

import education.kh.edu.domain.NoticeDto;
import education.kh.edu.domain.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    public void UserRegisterInsert(UserDto ud) throws Exception;

    public String UserRegisterIdDuplication(String id) throws Exception;
}
