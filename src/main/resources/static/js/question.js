$(document).ready(function(){
    $(".container").fadeIn(1000);
    $(".menu").fadeIn(1000);
    $(".paging_button").fadeIn(1000);
});

function inquiry(){
    $(".container").hide();
    $(".upload-container").show();

    // dropdown
    $("#default-public-button").show();
    $("#default-private-button").hide();
    $("#public-button").hide();
    $("#private-button").hide();
}

// dropdown
function choice_button() {
    $("#default-public-button").hide();
    $("#default-private-button").hide();
    $("#public-button").show();
    $("#private-button").show();
}
function public_check() {
    $("#default-public-button").show();
    $("#default-private-button").hide();
    $("#public-button").hide();
    $("#private-button").hide();
}
function private_check() {
    $("#default-public-button").hide();
    $("#default-private-button").show();
    $("#public-button").hide();
    $("#private-button").hide();
}

function saveArticle() {
    let form_data = new FormData()
    form_data.append("title", $("#h1").val())
    form_data.append("c1-content-content", $("#h2").val())

    $.ajax({
        type: "POST",
        url: `/registry`,
        data: form_data,
        contentType: false,
        processData: false,
        success: function (response) {
            alert("성공적으로 업로드 되었습니다.");
            // sessionStorage.setItem("image_idx", response['idx']);

            location.href = "empathy_space.html"; // 페이지 변환
        }
    });
}