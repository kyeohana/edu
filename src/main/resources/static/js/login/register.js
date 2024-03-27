$(".document").ready(function () {

    $(".joinForm").submit(function (event) {

        event.preventDefault()

        var id = $(".id").val();
        var pw = $(".pw").val();
        var pw_val = $(".pw_val").val();
        var name = $(".name").val();
        var email = $(".email").val();
        var address = $(".address").val();

        if (!id) {
            Swal.fire({
                icon: 'error',
                title: '아이디를 입력해주세요.',
                showConfirmButton: false,
                timer: 1500
                 });
            $(".textForm_1").addClass("error");
            return;
        } else {
            $(".textForm_1").removeClass("error");
            $(".textForm_2").removeClass("error");
            $(".textForm_3").removeClass("error");
            $(".textForm_4").removeClass("error");
            $(".textForm_5").removeClass("error");
            $(".textForm_6").removeClass("error");
        }

        if (!pw) {
            Swal.fire({
                icon: 'error',
                title: '비밀번호를 입력해주세요.',
                showConfirmButton: false,
                timer: 1500
            });
            $(".textForm_2").addClass("error");
            return;
        } else {
            $(".textForm_1").removeClass("error");
            $(".textForm_2").removeClass("error");
            $(".textForm_3").removeClass("error");
            $(".textForm_4").removeClass("error");
            $(".textForm_5").removeClass("error");
            $(".textForm_6").removeClass("error");
        }

        if (!pw_val) {
            Swal.fire({
                icon: 'error',
                title: '패스워드를 입력해주세요.',
                showConfirmButton: false,
                timer: 1500
            });
            $(".textForm_3").addClass("error");
            return;
        } else {
            $(".textForm_1").removeClass("error");
            $(".textForm_2").removeClass("error");
            $(".textForm_3").removeClass("error");
            $(".textForm_4").removeClass("error");
            $(".textForm_5").removeClass("error");
            $(".textForm_6").removeClass("error");
        }

        if (pw !== pw_val) {
            Swal.fire({
                icon: 'error',
                title: '패스워드가 일치하지 않습니다.',
                showConfirmButton: false,
                timer: 1500
            });
            $(".textForm_2").addClass("error");
            $(".textForm_3").addClass("error");
            return;
        } else {
            $(".textForm_1").removeClass("error");
            $(".textForm_2").removeClass("error");
            $(".textForm_3").removeClass("error");
            $(".textForm_4").removeClass("error");
            $(".textForm_5").removeClass("error");
            $(".textForm_6").removeClass("error");
        }

        if (!name) {
            Swal.fire({
                icon: 'error',
                title: '이름을 입력해주세요.',
                showConfirmButton: false,
                timer: 1500
            });
            $(".textForm_4").addClass("error");
            return;
        } else {
            $(".textForm_1").removeClass("error");
            $(".textForm_2").removeClass("error");
            $(".textForm_3").removeClass("error");
            $(".textForm_4").removeClass("error");
            $(".textForm_5").removeClass("error");
            $(".textForm_6").removeClass("error");
        }

        if (!email) {
            Swal.fire({
                icon: 'error',
                title: '이메일을 입력해주세요.',
                showConfirmButton: false,
                timer: 1500
            });
            $(".textForm_5").addClass("error");
            return;
        } else {
            $(".textForm_1").removeClass("error");
            $(".textForm_2").removeClass("error");
            $(".textForm_3").removeClass("error");
            $(".textForm_4").removeClass("error");
            $(".textForm_5").removeClass("error");
            $(".textForm_6").removeClass("error");
        }

        if (!address) {
            Swal.fire({
                icon: 'error',
                title: '주소를 입력해주세요.',
                showConfirmButton: false,
                timer: 1500
            });
            $(".textForm_6").addClass("error");
            return;
        } else {
            $(".textForm_1").removeClass("error");
            $(".textForm_2").removeClass("error");
            $(".textForm_3").removeClass("error");
            $(".textForm_4").removeClass("error");
            $(".textForm_5").removeClass("error");
            $(".textForm_6").removeClass("error");
        }

        var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

        if (!exptext.test(email)) {
            Swal.fire({
                icon: 'error',
                title: '이메일 형식이 올바르지 않습니다.</br> </br><span style=\'font-size: 0.8em; color: gray;\'>ex)abc@naver.com</span>',
                showConfirmButton: false,
                timer: 1500
            });
            $(".textForm_5").addClass("error");
            return;
            } else {
            $(".textForm_1").removeClass("error");
            $(".textForm_2").removeClass("error");
            $(".textForm_3").removeClass("error");
            $(".textForm_4").removeClass("error");
            $(".textForm_5").removeClass("error");
        }

        Swal.fire({
            title: '회원가입 하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url : '/user/login/idDuplication',
                    type : 'GET',
                    data : { id : id },
                    success : function (data) {
                        var count = data

                        if(count < 1) {
                            Swal.fire("good job!", "등록이 완료 되었습니다.", "success")
                                .then(() => {
                                    event.currentTarget.submit();
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: '아이디가 중복되었습니다.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            $(".textForm_1").addClass("error");
                            return;
                        }
                    }
                })

            } else {
                Swal.fire("취소되었습니다.")
                    .then(() => {
                    });
            }
        });
    })
});

function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample6_extraAddress").value = extraAddr;

            } else {
                document.getElementById("sample6_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}