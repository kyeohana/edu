$("document").ready(function () {

    $("#write-form").submit(function (event) {
        event.preventDefault()

        var title = $("#title").val();
        var context = $("#context").val();
        var password = $("#password").val();

        if (!title) {
            swal("Error","타이틀을 입력해주세요","warning");
            $("#title").addClass("error")
            return;
        } else {
            $("#title").removeClass("error")
        }

        if (!context) {
            swal("Error","내용을 입력해주세요","warning");
            $("#context").addClass("error")
            return;
        } else {
            $("#context").removeClass("error")
        }

        if (!password) {
            swal("Error","패스워드 입력해주세요","warning");
            $("#password").addClass("error")
            return;
        } else {
            $("#password").removeClass("error")
        }

        swal({
            title: "등록하시겠습니까?",
            icon: "info",
            buttons: {
                cancel: "취소",
                    confirm: "확인"
            },
        }).then((value) => {
            if (value) {
                swal("good job!", "등록이 완료 되었습니다.", "success")
                    .then(() => {
                        event.currentTarget.submit();

                    });
            } else {
                swal("취소되었습니다.")
                    .then(() => {
                    });
            }
        });
    });
});