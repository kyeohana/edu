package education.kh.edu.contoller;

import education.kh.edu.domain.NoticeDto;
import education.kh.edu.domain.UserDto;
import education.kh.edu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/user/login")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String UserRegisterInsert(UserDto ud) throws Exception {
        String hashedPassword = passwordEncoder.encode(ud.getMEMBER_PASSWORD());
        ud.setMEMBER_PASSWORD(hashedPassword);

        userService.UserRegisterInsert(ud);

        return "redirect:/main";
    }

    @GetMapping("/idDuplication")
    @ResponseBody
    public String UserRegisterIdDuplication(@RequestParam String id) throws Exception {

     return userService.UserRegisterIdDuplication(id);

    }

    @PostMapping("/update")
    public String UserRegisterUpdate(UserDto ud) throws Exception {
        String hashedPassword = passwordEncoder.encode(ud.getMEMBER_PASSWORD());
        ud.setMEMBER_PASSWORD(hashedPassword);

        userService.UserRegisterUpdate(ud);

        return "redirect:/login/logout";
    }

    @GetMapping("/deleteUser")
    public String UserDelete(String loginId) throws Exception {

        userService.UserDelete(loginId);

        return "redirect:/login/logout";
    }
}
