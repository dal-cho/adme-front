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

function updateArticle(id){
    let Registry = { // 수정
        "title" : $(".board-title").text(),
        "main" : $(".board-content").text().trim(),
    }
    document.location.href = registry_upload_page;
    update(id, $(".board-title").text(), $(".board-content").text().trim())
}

function update(id, title, main){
    $("#empathy-upload-title").text = title
    $(".adme-front").text = main
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

function updateA(){
    let contentDiv = document.querySelector('.board-content');
    let textarea = contentDiv.querySelector('textarea');
    let input = contentDiv.querySelector('input');

    input.style.display = 'block';
    input.value = textarea.value;
    input.focus();

    // textarea의 스타일을 input에 적용
    input.style.width = textarea.offsetWidth + 'px';
    input.style.height = textarea.offsetHeight + 'px';
    input.style.fontFamily = window.getComputedStyle(textarea).fontFamily;
    input.style.fontSize = window.getComputedStyle(textarea).fontSize;

    textarea.style.display = 'none';

}