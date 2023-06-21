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
function deleteArticle(id) {

}
