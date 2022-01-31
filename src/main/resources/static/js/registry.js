$(document).ready(function(){
    $(".container").fadeIn(1000);
    $(".menu").fadeIn(1000);
    $(".paging_button").fadeIn(1000);
});

function saveArticle() {
    let form_data = new FormData()
    form_data.append("title", $("#h1").val())
    form_data.append("main", $("#h2").val())

    $.ajax({
        type: "POST",
        url: `/registry`,
        data: form_data,
        contentType: false,
        processData: false,
        success: function (response) {
            alert("성공적으로 업로드 되었습니다.");
            // sessionStorage.setItem("image_idx", response['idx']);
            location.href = "/space"; // 페이지 변환
        }
    });
}





