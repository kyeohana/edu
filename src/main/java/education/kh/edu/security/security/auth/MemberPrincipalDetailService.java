package education.kh.edu.security.security.auth;

import education.kh.edu.security.member.entity.Member;
import education.kh.edu.security.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class MemberPrincipalDetailService implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberRepository.findByLoginId(username);
        System.out.println("username : " + username);
        System.out.println("member : " + member);
        if(member == null)
            throw new UsernameNotFoundException(username + "을 찾을 수 없습니다.");

        if(!"Y".equals(member.getIsUsed()))
            throw new UsernameNotFoundException("사용할 수 없는 계정입니다.");

        if(!"N".equals(member.getIsDel()))
            throw new UsernameNotFoundException("삭제된 계정입니다.");

        return new MemberPrincipalDetails(member);
    }
}
