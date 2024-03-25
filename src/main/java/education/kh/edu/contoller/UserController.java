package education.kh.edu.contoller;

import education.kh.edu.domain.UserDto;
import education.kh.edu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user/login")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String UserRegisterInsert(UserDto ud) throws Exception {

        userService.UserRegisterInsert(ud);

        return "redirect:/main";
    }

}
