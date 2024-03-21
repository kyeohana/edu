package education.kh.edu.security.security.config;


import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class MemberAuthFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws ServletException, IOException, ServletException {
        HttpSession session = request.getSession();
        session.setAttribute("loginErrorMessage", exception.getMessage());
        setDefaultFailureUrl("/login/loginForm?error=true&t=h");
        super.onAuthenticationFailure(request, response, exception);
    }
}
