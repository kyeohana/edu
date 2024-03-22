package education.kh.edu.security.security.config;

import education.kh.edu.security.security.auth.MemberPrincipalDetailService;
import education.kh.edu.security.security.provider.MemberAuthenticatorProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class MemberSecurityConfig {

    @Autowired
    MemberAuthenticatorProvider memberAuthenticatorProvider;

    @Autowired
    MemberPrincipalDetailService memberPrincipalDetailService;

    @Autowired
    public void configure (AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(memberAuthenticatorProvider);
    }

    @Bean
    public SecurityFilterChain memberSecurityFilterChain (HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.authorizeRequests(authorize -> {
            try {
                authorize
                        .antMatchers("/css/**", "/img/**", "/js/**", "/member/login/**", "/member/attachment/**", "/member/files/**")
                        .permitAll() // 해당 경로는 인증 없이 접근 가능
                        .antMatchers("/board/**") // 해당 경로는 인증이 필요
                        .hasRole("MEMBER") // ROLE 이 MEMBER 가 포함된 경우에만 인증 가능
                    .and()
                        .formLogin()
                        .loginPage("/login/login") // 로그인 페이지 설정
                        .loginProcessingUrl("/login/login") // 로그인 처리 URL 설정
                        .defaultSuccessUrl("/main") // 로그인 성공 후 이동할 페이지
                        .successHandler(new MemberAuthSuccessHandler()) // 로그인 성공 후 처리할 핸들러
                        .failureHandler(new MemberAuthFailureHandler()) // 로그인 실패 후 처리할 핸들러
                        .permitAll()
                    .and()
                        .logout()
                        .logoutUrl("/login/logout") // 로그아웃 처리 URL 설정
                        /*.logoutSuccessUrl("/login/loginForm?logout=1") // 로그아웃 성공 후 이동할 페이지*/
                        .logoutSuccessUrl("/main")
                        .deleteCookies("JSESSIONID"); // 로그아웃 후 쿠키 삭제
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });

        http.rememberMe()
                .key("namhyeok") // 인증 토큰 생성시 사용할 키
                .tokenValiditySeconds(60 * 60 * 24 * 7) // 인증 토큰 유효 시간 (초)
                .userDetailsService(memberPrincipalDetailService) // 인증 토큰 생성시 사용할 UserDetailsService
                .rememberMeParameter("remember-me"); // 로그인 페이지에서 사용할 파라미터 이름

        return http.build();
    }
}
