package education.kh.edu.security.security.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class MemberAuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException, ServletException {
        // 로그인 성공시 이동할 페이지
        setDefaultTargetUrl("/main");
        // 로그인 성공시 이동할 페이지로 이동
        super.onAuthenticationSuccess(request, response, authentication);
    }

}
