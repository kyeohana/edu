package education.kh.edu.service;

import education.kh.edu.domain.NoticeDto;
import education.kh.edu.domain.UserDto;

import java.util.List;

public interface UserService {

    public void UserRegisterInsert(UserDto ud) throws Exception;

    public String UserRegisterIdDuplication(String id) throws Exception;
}
