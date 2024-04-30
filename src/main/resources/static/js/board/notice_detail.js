$("document").ready(function () {

    var noticeId = new URLSearchParams(window.location.search).get('noticeId');
    console.log(noticeId);

    $.ajax({
            url: '/board/notice/writedetail',
            type: 'GET',
            dataType: 'JSON',
            data: { id: noticeId },
            success: function (data) {

                var datafull = data;
                var useriddata = $(".post-userid-text");
                var titledata = $(".post-title-text");
                var contextdata = $(".post-context-text");
                var filelink = $(".file-title-text");

                if (datafull && datafull.length > 0) {
                    var userid_context =
                        '<p>' + datafull[0].user_id + '</p>';
                    var title_context =
                        '<p>' + datafull[0].title + '</p>';
                    var content_context =
                        '<p>' + datafull[0].context + '</p>';
                    if (datafull[0].file && datafull[0].file.length > 0) {
                        var file_link = '<a href="\/file/\ ' +
                             + datafull[0].file + '" download="' + datafull[0].file + '">' + datafull[0].file + '</a>';


                    }

                    useriddata.append(userid_context)
                    titledata.append(title_context)
                    contextdata.append(content_context)
                    filelink.append(file_link)

                    $('input[name="num"]').val(noticeId);

                } else {
                    var userid_context =
                        '<p>조회 된 데이터가 없습니다</p>';
                    var title_context =
                        '<p>조회 된 데이터가 없습니다</p>';
                    var content_context =
                        '<p> 조회 된 데이터가 없습니다 </p>';

                    useriddata.append(userid_context)
                    titledata.append(title_context)
                    contextdata.append(content_context)
                }
            },
            error: function(error){
                console.error('error balsang :', error);
            }
        }
    )

    $.ajax({
        url : '/board/notice/listAnswer',
        type : 'GET',
        dataType: 'json',
        data : { id : noticeId },
        success: function (data) {

            var dataListAnswer = data;
            var commontAuthorList = $(".commont-author-list");
            var commentDateList = $(".comment-date-list");
            var commentConList = $(".comment-con-list");

            if(dataListAnswer && dataListAnswer.length > 0){
                for (i =0; i < dataListAnswer.length; i++) {
                    var formattedDate = new Date(dataListAnswer[i].cre_date).toISOString().split('T')[0];
                    var rowAuthorUserId =
                        '<div>' + dataListAnswer[i].user_id + '</div>';
                    var rowAuthorCreDate =
                        '<div>' + formattedDate + '</div>';
                    var rowAuthorConText =
                        '<div>' + dataListAnswer[i].context + '</div>';

                    commontAuthorList.append(rowAuthorUserId);
                    commentDateList.append(rowAuthorCreDate);
                    commentConList.append(rowAuthorConText);
                }
            } else {
                var rowAuthorList =
                    '<div> 댓글이 없습니다. </div>'
                commentConList.append(rowAuthorList)
            }
        },
        error: function(error){
            console.error('error balsang :', error);
        }
    })

    $(".comment-form").submit(function (event) {
        event.preventDefault()

        var userId = $("#user_id").val();
        var context = $("#context").val();


        if (!userId) {
            swal("Error","작성자를 입력해주세요","warning");
            $("#user_id").addClass("error")
            return;
        } else if (userId.length > 5) {
            swal("Error","작성자를 5글자 이내로 입력해주세요","warning");
            $("#user_id").addClass("error")
            return;
        } else {
            $("#user_id").removeClass("error")
        }

        if (!context) {
            swal("Error","내용을 입력해주세요","warning");
            $("#context").addClass("error")
            return;
        } else if (context.length > 30) {
            swal("Error","내용을 30글자 이내로 입력해주세요","warning");
            $("#context").addClass("error")
            return;
        } else {
            $("#context").removeClass("error")
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
                        $("#user_id").val("");
                        $("#context").val("");
                });
            }
        });
    });
});