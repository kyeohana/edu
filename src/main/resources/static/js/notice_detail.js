$("document").ready(function () {

    var noticeId = new URLSearchParams(window.location.search).get('noticeId');
    console.log(noticeId);

    $('input[name="num"]').val(noticeId);

    $.ajax({
            url: '/board/notice/writedetail',
            type: 'GET',
            dataType: 'JSON',
            data: { id: noticeId },
            success: function (data) {

                var datafull = data;
                var titledata = $(".post-title-text")
                var contextdata = $(".post-context-text")

                if (datafull && datafull.length > 0) {
                    var title_context =
                        '<p>' + datafull[0].title + '</p>';

                    var content_context =
                        '<p>' + datafull[0].context + '</p>';

                    titledata.append(title_context)
                    contextdata.append(content_context)
                } else {
                    var title_context =
                        '<p>조회 된 데이터가 없습니다</p>';

                    var content_context =
                        '<p> 조회 된 데이터가 없습니다 </p>';

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
                    '<span>' + 댓글이없습니다 + '</span>'
                commentConList.append(rowAuthorList)
            }
        },
        error: function(error){
            console.error('error balsang :', error);
        }
    })

    $(".comment-form").submit(function (event) {
        event.preventDefault()

        var con = confirm("등록하시겠습니까?")
        var userId = $("#user_id").val();
        var context = $("#context").val();


        if (!userId) {
            alert("작성자를 입력해주세요")
            $("#user_id").addClass("error")
            return;
        } else if (userId.length > 5) {
            alert("작성자를 5글자 이내로 입력해주세요")
            $("#user_id").addClass("error")
            return;
        } else {
            $("#user_id").removeClass("error")
        }

        if (!context) {
            alert("내용을 입력해주세요")
            $("#context").addClass("error")
            return;
        } else if (context.length > 30) {
            alert("내용을 30글자 이내로 입력해주세요")
            $("#context").addClass("error")
            return;
        } else {
            $("#context").removeClass("error")
        }

        if (con) {
            alert("등록이 완료 되었습니다.");
            this.submit();
        } else {
            alert("취소되었습니다.");
        }
    })
});