$(".document").ready(function () {

    $(".joinForm").submit(function (event) {

        event.preventDefault()

        var id = $(".id").val();
        var pw = $(".pw").val();
        var pw_val = $(".pw_val").val();
        var name = $(".name").val();
        var email = $(".email").val();

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
            title: '수정 하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.value) {
                Swal.fire("good job!", "수정이 완료 되었습니다.", "success")
                    .then(() => {
                        event.currentTarget.submit();
                    });
            } else {
                Swal.fire("취소되었습니다.")
                    .then(() => {
                    });
            }
        });
    })
});