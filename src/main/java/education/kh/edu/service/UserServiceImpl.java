package education.kh.edu.service;

import education.kh.edu.domain.UserDto;
import education.kh.edu.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    public void UserRegisterInsert(UserDto ud) throws Exception{

        userMapper.UserRegisterInsert(ud);
    }

    public String UserRegisterIdDuplication(String id) throws Exception{

        return userMapper.UserRegisterIdDuplication(id);
    }

    public void UserRegisterUpdate(UserDto ud) throws Exception{

        userMapper.UserRegisterUpdate(ud);
    }
}
