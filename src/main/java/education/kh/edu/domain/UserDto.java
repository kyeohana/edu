package education.kh.edu.domain;

import lombok.Data;

@Data
public class UserDto {
  private String MEMBER_ID;
  private String MEMBER_LOGIN_ID;
  private String MEMBER_ROLE;
  private String MEMBER_NAME;
  private String MEMBER_PASSWORD;
  private String MEMBER_EMAIL;
  private String IS_USED;
  private String IS_DEL;
  private String ISRT_DATE;
  private String UPDT_DATE;
  private String MEMBER_ADDRESS_CODE;
  private String MEMBER_ADDRESS;
  private String MEMBER_ADDRESS_DETAIL;
  private String MEMBER_ADDRESS_DETAIL_VAL;
}
