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
            }
        }
    )



});