package education.kh.edu.security.security.provider;

import education.kh.edu.security.member.entity.Member;
import education.kh.edu.security.security.auth.MemberPrincipalDetailService;
import education.kh.edu.security.security.auth.MemberPrincipalDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class MemberAuthenticatorProvider implements AuthenticationProvider {

    @Autowired
    private MemberPrincipalDetailService memberPrincipalDetailService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = (String) authentication.getCredentials();


        MemberPrincipalDetails memberPrincipalDetails = (MemberPrincipalDetails) memberPrincipalDetailService.loadUserByUsername(username);

        String dbPassword = memberPrincipalDetails.getPassword();
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        if(!passwordEncoder.matches(password, dbPassword)) {
            System.out.println("[사용자] 비밀번호가 일치하지 않습니다.");
            throw new BadCredentialsException("[사용자] 아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        Member member = memberPrincipalDetails.getMember();
        if (member == null || "N".equals(member.getIsUsed())) {
            System.out.println("[사용자] 사용할 수 없는 계정입니다.");
            throw new BadCredentialsException("[사용자] 사용할 수 없는 계정입니다.");
        }

        return new UsernamePasswordAuthenticationToken(memberPrincipalDetails, null, memberPrincipalDetails.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
