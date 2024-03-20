$("document").ready(function () {

    var currentPage = 1;

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
    getPage(currentPage);
});

function getPage(pageNumber) {

    currentPage = pageNumber;
    var itemsPerPage = 10;
    scrollPosition = $(window).scrollTop();

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
                            '<td>' + notice.answer_Cnt + '</td>'+
                            '<td><button class="btn btn-dark" onclick="noticedelete(' + notice.num + ', \'' + notice.password + '\')"> 삭제 </button></td>'
                    } else {
                        row += '<td style="color: red"> 삭제된 게시물 입니다. </td>' +
                            '<td> - </td>' +
                            '<td> - </td>' +
                            '<td> - </td>' +
                            '<td> - </td>' ;
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
    });
}

function noticedelete(noticeNum, noticePassword) {
    // SweetAlert을 사용하여 비밀번호 입력 대화상자 표시
    Swal.fire({
        title: '비밀번호를 입력하세요:',
        input: 'password',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        showLoaderOnConfirm: true,
        customClass: {
            title: 'swal-title'
        },
        preConfirm: (password) => {
            // 비밀번호 확인
            if (password === noticePassword) {
                return Swal.fire({
                    title: '정말 삭제하시겠습니까?',
                    showDenyButton: true,
                    confirmButtonText: '예',
                    denyButtonText: '아니오'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // 삭제 요청을 서버에 보냄
                        $.ajax({
                            url: '/board/notice/delete',
                            type: 'GET',
                            data: {
                                num: noticeNum,
                                password: password
                            },
                            success: function (data) {
                                // 페이지 다시 로드
                                getPage(currentPage);
                            },
                            error: function (error) {
                                console.error('삭제에 실패했습니다:', error);
                            }
                        });
                    }
                });
            } else {
                // 비밀번호가 일치하지 않는 경우 알림
                Swal.fire({
                    icon: 'error',
                    title: '비밀번호가 일치하지 않습니다.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    });
}

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
        $(window).scrollTop(scrollPosition);
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