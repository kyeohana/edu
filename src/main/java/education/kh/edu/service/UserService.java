package education.kh.edu.service;

import education.kh.edu.domain.UserDto;

public interface UserService {

    public void UserRegisterInsert(UserDto ud) throws Exception;

    public String UserRegisterIdDuplication(String id) throws Exception;

    public void UserRegisterUpdate(UserDto ud) throws Exception;
}
