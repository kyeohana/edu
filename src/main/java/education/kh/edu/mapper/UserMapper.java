package education.kh.edu.mapper;

import education.kh.edu.domain.UserDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    public void UserRegisterInsert(UserDto ud) throws Exception;

    public String UserRegisterIdDuplication(String id) throws Exception;

    public void UserRegisterUpdate(UserDto ud) throws Exception;

    public void UserDelete(String loginId) throws Exception;
}
