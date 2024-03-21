package education.kh.edu.security.member.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "MEMBER_TB")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_ID")
    private Long id;

    @Column(name = "MEMBER_LOGIN_ID")
    private String loginId;

    @Column(name = "MEMBER_ROLE")
    private String role;

    @Column(name = "MEMBER_NAME")
    private String name;

    @Column(name = "MEMBER_PASSWORD")
    private String password;

    @Column(name = "MEMBER_EMAIL")
    private String email;

    @Column(name = "IS_USED")
    private String isUsed;

    @Column(name = "IS_DEL")
    private String isDel;

    @Column(name = "ISRT_DATE")
    private LocalDateTime isrtDate;

    @Column(name = "UPDT_DATE")
    private LocalDateTime updtDate;
}
