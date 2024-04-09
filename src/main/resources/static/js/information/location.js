
$(document).ready(function () {
    $(".selector").flatpickr({
        enableTime: false,
    });
})


function click_enddate(){
    var endDate = $("#endDate").val();
    var endDateTime = new Date(endDate);

    var lastDay = new Date(endDateTime.getFullYear(), endDateTime.getMonth() + 1, 0);

    function isWeekendOrHoliday(date) {
        var dayOfWeek = date.getDay();

        return dayOfWeek === 0 || dayOfWeek === 6;
    }

    if (isWeekendOrHoliday(lastDay)) {
        var lastBusinessDay = null;

        for (var i = lastDay.getDate(); i > 0; i--) {

            var checkDay = new Date(lastDay.getFullYear(), lastDay.getMonth(), i);

            if (!isWeekendOrHoliday(checkDay)) {
                lastBusinessDay = checkDay;
                break;
            }
        }
        if (lastBusinessDay) {
            if (lastBusinessDay.getDate() === parseInt(endDate.toString().substring(8,10))) {
                Swal.fire('마지막주');
            } else {
                Swal.fire('아닙니다');
            }
        } else {
            Swal.fire('아닙니다');
        }
    } else {
        if (lastDay.getDate() === parseInt(endDate.toString().substring(8,10))) {
            Swal.fire('마지막주');
        } else {
            Swal.fire('아닙니다');
        }
    }
};
