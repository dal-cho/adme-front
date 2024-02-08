$(document).ready(function(){
    localStorage.getItem("article")
    if(localStorage.getItem("article")==="update"){
        localStorage.setItem("article", "default")
        update()
    }
});

// 게시글 등록하기
function saveArticle() {
    let form_data = new FormData();
    form_data.append("title", $("#empathy-upload-title").val());
    form_data.append("main", $(".empathy-upload-content>textarea").val());

    $.ajax({
        type: "POST",
        url: host + `/registry`,
        data: form_data,
        contentType: false,
        processData: false,
        headers: {"Authorization": token},
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
            headers: {"Authorization": token},
            success: function (result) {
                alert("삭제 완료");
                window.location.href = my_record_main_page;
            }
        });
    }
}

function update(){
    console.log("title : " + updateTitle)
    console.log("updateMain : " + updateMain)
    $("#empathy-upload-title").val(updateTitle)
    $("#contentTextarea").val(updateMain);
}
function updateButton(){
    $.ajax({
        type: "PUT",
        url: host + `/registry/${id}`,
        headers: {"Authorization": token},
        data: JSON.stringify(Registry),
        contentType: "application/json;charset=utf-8",
        dataType : "json",
        success: function (response) {
            allArticle(id)
        }
    });
}
