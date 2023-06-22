// 게시글 등록하기
function saveArticle() {
    let form_data = new FormData();
    form_data.append("title", $("#empathy-upload-title").val());
    form_data.append("main", $(".sympathetic-upload-content>textarea").val());

    $.ajax({
        type: "POST",
        url: `/registry`,
        data: form_data,
        contentType: false,
        processData: false,
        success: function (response) {
            alert("성공적으로 업로드 되었습니다.");
            window.location.href = my_record_main_page; // 페이지 변환
        }
    });
}

// 게시글 삭제
function articleDelete(id) {
    let choice = confirm("해당 게시글물을 삭제 하시겠습니까?");
    if (choice) {
        $.ajax({
            type: "DELETE",
            url: host + '/registry/'+id,
            contentType: false,
            processData: false,
            headers: {"X-AUTH-TOKEN": cookie},
            success: function (result) {
                alert("삭제 완료");
                window.location.href = my_record_main_page;
            }
        });
    }
}