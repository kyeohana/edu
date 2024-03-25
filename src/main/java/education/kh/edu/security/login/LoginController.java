package education.kh.edu.security.login;

import education.kh.edu.security.member.entity.Member;
import education.kh.edu.security.security.auth.MemberPrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@Controller
@RequiredArgsConstructor
public class LoginController {

    private boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || AnonymousAuthenticationToken.class.
                isAssignableFrom(authentication.getClass())) {
            return false;
        }
        return authentication.isAuthenticated();
    }


    @GetMapping("/login/loginForm")
    public String login(HttpServletRequest request,
                        @AuthenticationPrincipal MemberPrincipalDetails memberPrincipalDetails) {
        HttpSession session = request.getSession();
        String msg = (String) session.getAttribute("loginErrorMessage");
        session.setAttribute("loginErrorMessage", msg != null ? msg : "");

        if(isAuthenticated()) {
            if(memberPrincipalDetails == null)
                return "redirect:/login/logout";
            return "redirect:/main";
        }
        return "login/login";
    }

    @GetMapping("/text/text")
    public String text(@AuthenticationPrincipal MemberPrincipalDetails memberPrincipalDetails
            ,Model model) {

        Member member = memberPrincipalDetails.getMember();

        model.addAttribute("member", member);
        return "text/text";
    }
    @GetMapping("/include/header")
    public String mainText(@AuthenticationPrincipal MemberPrincipalDetails memberPrincipalDetails
            ,Model model) {

        Member member = new Member();

        if (memberPrincipalDetails != null && memberPrincipalDetails.getMember() != null) {
            member = memberPrincipalDetails.getMember();
            if (member.getName() == null) {
                member.setName("");
            }
        }

        model.addAttribute("member", member);

        return "include/header";
    }

    @GetMapping("/board/notice_write")
    public String noticeWriteHtml(@AuthenticationPrincipal MemberPrincipalDetails memberPrincipalDetails
            ,Model model) {

        Member member = new Member();

        if (memberPrincipalDetails != null && memberPrincipalDetails.getMember() != null) {
            member = memberPrincipalDetails.getMember();
            if (member.getName() == null) {
                member.setName("");
            }
        }

        model.addAttribute("member", member);

        return "board/notice_write";
    }

    @GetMapping("/login/mypage")
    public String mypageHtml(@AuthenticationPrincipal MemberPrincipalDetails memberPrincipalDetails
            ,Model model) {

        Member member = new Member();

        if (memberPrincipalDetails != null && memberPrincipalDetails.getMember() != null) {
            member = memberPrincipalDetails.getMember();
            if (member.getName() == null) {
                member.setName("");
            }
        }

        model.addAttribute("member", member);

        return "login/mypage";
    }

}
