$("document").ready(function () {

    $("#write-form").submit(function(event) {
        event.preventDefault()

        var con = confirm("등록하시겠습니까?")

        if(con){
            alert("등록이 완료 되었습니다.");
            this.submit();
        }

    })


});