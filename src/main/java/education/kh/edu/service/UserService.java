package education.kh.edu.service;

import education.kh.edu.domain.UserDto;

import java.util.SplittableRandom;

public interface UserService {

    public void UserRegisterInsert(UserDto ud) throws Exception;

    public String UserRegisterIdDuplication(String id) throws Exception;

    public void UserRegisterUpdate(UserDto ud) throws Exception;

    public void UserDelete(String loginId) throws Exception;
}
