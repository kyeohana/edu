package education.kh.edu.domain;

import lombok.Data;

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
    private String file ;
    private String file_cra_date ;

    private int num_notice;
    private int answer_Cnt;
    private int totalPages;
}
