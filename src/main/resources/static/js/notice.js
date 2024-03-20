$("document").ready(function () {

    var currentPage = 1;
    function getPage(pageNumber) {

        var itemsPerPage = 10;

        $.ajax({
            url: '/board/notice/list',
            type: 'GET',
            dataType: 'json',
            data: {
                page: pageNumber,
                itemsPerPage: itemsPerPage
            },
            success: function(data) {
                console.log(data);

                var notices = data;
                var tableBody = $('.board-table tbody');

                tableBody.empty();

                if (notices && notices.length > 0) {
                    for (var i = 0; i < notices.length; i++) {
                        var notice = notices[i];
                        var formattedDate = new Date(notice.cre_date).toISOString().split('T')[0];
                        var totalPages = $('.totalPages');
                        var total = '<div>총 ' + notice.totalPages + '건</div>';
                        totalPages.html(total);

                        var row = '<tr>' +
                            '<td>' +
                            '<input type="hidden" name="notice_num" value="' + notice.num + '">' + (notice.num) + '</td>';

                        if (notice.del_yn == 'N') {
                            row += '<td><a href="/board/notice_detail.html?noticeId=' + notice.num + '">' + notice.title + '</a></td>' +
                                '<td>' + formattedDate + '</td>' +
                                '<td>' + notice.view_cnt + '</td>' +
                                '<td>' + notice.answer_Cnt + '</td>';
                        } else {
                            row += '<td style="color: red"> 삭제된 게시물 입니다. </td>' +
                                '<td> - </td>' +
                                '<td> - </td>' +
                                '<td> - </td>';
                        }
                        row += '</tr>';
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
        totalPages = notice.totalPages;
        var paginationContainer = $('.pagination');
        var maxVisiblePages = 10;
        var totalPages = Math.ceil(totalPages / maxVisiblePages);
        var currentPage = 1;

        paginationContainer.empty();

        var prevButton = $('<li class="page-item"><a class="page-link" href="#">이전</a></li>');
        if (currentPage === 1) {
            prevButton.addClass('disabled');
        } else {
            prevButton.click(function () {
                getPage(currentPage - 1);
            });
        }
        paginationContainer.append(prevButton);

        var startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        var endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, totalPages - maxVisiblePages + 1);
        }

        for (var i = startPage; i <= endPage; i++) {
            var pageButton = $('<li class="page-item"><a class="page-link" href="#">' + i + '</a></li>');
            pageButton.find('a').click(function () {
                getPage($(this).text());
            });
            paginationContainer.append(pageButton);
        }

        var nextButton = $('<li class="page-item"><a class="page-link" href="#">다음</a></li>');
        if (currentPage === totalPages) {
            nextButton.addClass('disabled');
        } else {
            nextButton.click(function () {
                getPage(currentPage + 1);
            });
        }
        paginationContainer.append(nextButton);
    }

    getPage(currentPage);
});