package education.kh.edu.security.member.repository;

import education.kh.edu.security.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByLoginId(String username);
}
