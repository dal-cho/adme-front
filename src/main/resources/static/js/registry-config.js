$(document).ready(function(){
    localStorage.getItem("article")
    if(localStorage.getItem("article")==="update"){
        localStorage.setItem("article", "updateBtn")
        update()
    }
});

// 게시글 등록하기
function saveArticle() {
    if(localStorage.getItem("article")==="updateBtn"){
        localStorage.setItem("article", "default")
        updateButton()
    }else{
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
    let updateTitle =window.localStorage.getItem("updateTitle");
    let updateMain =window.localStorage.getItem("updateMain");
    if(updateTitle!=null && updateMain!=="" && updateMain!=null){
        $("#empathy-upload-title").val(updateTitle)
        $("#contentTextarea").val(updateMain);
        window.localStorage.setItem("updateTitle", "");
        window.localStorage.setItem("updateMain", "");
    }

}
function updateButton(){
    console.log("= updateButton = ")
    let id = window.localStorage.getItem("id");
    console.log("title : " + $("#empathy-upload-title").val())
    console.log("main : " + $(".empathy-upload-content>textarea").val())
    let Registry = {
        "title": $("#empathy-upload-title").val(),
        "main": $(".empathy-upload-content>textarea").val()
    }
    $.ajax({
        type: "PUT",
        url: host + `/registry/${id}`,
        headers: {"Authorization": token},
        data: JSON.stringify(Registry),
        contentType: "application/json;charset=utf-8",
        dataType : "json",
        success: function (response) {
            alert("수정이 완료되었습니다.")
            window.localStorage.setItem("id","");
            window.location.href = my_record_main_page;
        }
    });
}
