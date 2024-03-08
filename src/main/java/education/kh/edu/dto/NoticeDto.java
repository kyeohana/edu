package education.kh.edu.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeDto {
    private int num;
    private String user_id;
    private String title ;
    private String contextLL ;
    private String cre_date ;
    private String view_cnt ;
    private String del_yn ;
    private String del_date ;
    private String upd_date ;
    private String file ;
    private String file_cra_date ;
}
