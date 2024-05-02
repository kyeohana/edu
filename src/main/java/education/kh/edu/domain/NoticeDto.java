package education.kh.edu.domain;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class NoticeDto {
    private int num;
    private String user_id;
    private String title ;
    private String context ;
    private Date cre_date ;
    private String view_cnt ;
    private String del_yn ;
    private String del_date ;
    private String upd_date ;
    private String password;
    private String filePath;
    private Date file_cra_date;
    private MultipartFile file;
    private String originalFileName;

    private int num_notice;
    private int answer_Cnt;
    private int totalPages;

}