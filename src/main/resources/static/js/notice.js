

$("document").ready(function () {

    var currentPage = 1;
    function getPage(pageNumber) {
        currentPage = pageNumber; // 페이지 번호 업데이트
        var itemsPerPage = 10;

    $.ajax({
        url: '/board/notice/list',
        type : 'GET',
        dataType: 'json',
        data: {
            page: pageNumber,
            itemsPerPage: itemsPerPage
        },
        success: function (data) {
            console.log(data);

            var notices = data;
            var tableBody = $('.board-table tbody');

            tableBody.empty();

            if (notices && notices.length > 0) {
                for (var i = 0; i < notices.length; i++) {
                    var notice = notices[i];
                    var formattedDate = new Date(notice.cre_date).toISOString().split('T')[0];
                    var totalPages = $('.totalPages');
                    var total = '<div>총 ' + notice.totalPages + '건</div>'
                        totalPages.html(total);
                    var row =
                        '<tr>' +
                        '<td>' +
                        '<input type="hidden" name="notice_num" value="' + notice.num + '">' + (notices.length - i) + '</td>' +
                        '<td><a href="/board/notice_detail.html?noticeId=' + notice.num + '">' + notice.title + '</a></td>' +
                        '<td>' + formattedDate + '</td>' +
                        '<td>' + notice.view_cnt + '</td>' +
                        '<td>' + notice.answer_Cnt + '</td>' +
                        '</tr>';
                    tableBody.append(row);
                }
            } else {
                var noDataRow = '<tr>' +
                    '<td colspan="4">조회된 데이터가 없습니다</td>' +
                    '</tr>';
                tableBody.append(noDataRow);
            }
            updatePagination(notice);
        },
        error: function(error){
            console.error('error balsang :', error);
            }
        }

    )
    }

    $('.board-table').on('click', 'a', function(event) {

        var noticeId = $(this).closest('tr').find('input[name="notice_num"]').val();

        $.ajax({
            url: '/board/notice/view_count',
            type: 'GET',
            data: { id: noticeId },
            success: function(response) {
                console.log('조회수가 성공적으로 증가했습니다.');
            },
            error: function(error) {
                console.error('조회수 증가에 실패했습니다:', error);
            }
        });
    });

    function updatePagination(notice) {
        totalPages = notice.totalPages; // 전체 페이지 수 업데이트
        var paginationContainer = $('.pagination');
        paginationContainer.empty(); // 페이징을 초기화

        // '이전' 버튼 추가
        var prevButton = $('<li class="page-item"><a class="page-link" href="#">이전</a></li>');
        if (currentPage === 1) {
            prevButton.addClass('disabled'); // 현재 페이지가 첫 페이지인 경우 '이전' 버튼 비활성화
        } else {
            prevButton.click(function () {
                getPage(currentPage - 1);
            });
        }
        paginationContainer.append(prevButton);

        // 페이지 번호 버튼 추가
        for (var i = 1; i <= totalPages; i++) {
            var pageButton = $('<li class="page-item"><a class="page-link" href="#">' + i + '</a></li>');
            if (i === currentPage) {
                pageButton.addClass('active'); // 현재 페이지를 나타내는 버튼은 활성화된 상태로 표시
            } else {
                pageButton.click(function () {
                    getPage($(this).text());
                });
            }
            paginationContainer.append(pageButton);
        }

        // '다음' 버튼 추가
        var nextButton = $('<li class="page-item"><a class="page-link" href="#">다음</a></li>');
        if (currentPage === totalPages) {
            nextButton.addClass('disabled'); // 현재 페이지가 마지막 페이지인 경우 '다음' 버튼 비활성화
        } else {
            nextButton.click(function () {
                getPage(currentPage + 1);
            });
        }
        paginationContainer.append(nextButton);
    }

    // 페이지 초기화면 로드 시 첫 번째 페이지 데이터 요청
    getPage(currentPage);
});