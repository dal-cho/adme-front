//video 게시글 비어있는지 체크
function videoUploadCheck(){
    let title = $(".upload-title>input").val();
    let content = $(".upload-content>textarea").val();
    let setTime = $(".upload-cut-time>input").val();
    if(title === "") alert("title을 작성해 주세요.");
    else if(content === "") alert("content를 작성해 주세요.");
    if(setTime === "") $(".upload-cut-time>input").val(0);
    if(title !== "" && content !== "") {
        videoUpload();
        $(".none-page").css("display", "block");
    }
}

// video 업로드
function videoUpload() {
    let data = {
        "title" : $(".upload-title>input").val(),
        "content" : $(".upload-content>textarea").val(),
        "setTime" : $(".upload-cut-time>input").val()
    }

    let video = $("input[name='uploadFile']"); // input 타입중 name이 'uploadFile'인 것 jquery 로 표현
    let thumb = $("input[name='thumbnail']");
    let videoFile = video[0].files;
    let thumbnail = thumb[0].files;

    let formData = new FormData();

    formData.append("sideData", new Blob([JSON.stringify(data)], {type: "application/json"}));

    formData.append("videoFile", videoFile[0]);
    formData.append("thumbnail", thumbnail[0]);

    //ajax 를 통해 controller 와 연결
    $.ajax({
        type: "POST",
        url: host + '/tenSeconds/videos',
        contentType: false,
        processData: false,
        data: formData,
        headers: {"Authorization": token},
        success: function (result) {
            alert("업로드 완료");
            $(".none-page").css("display", "none");
            window.location.href = my_record_main_page;
        }
    });
}

// video 파일 용량체크
$("input[name=uploadFile]").on("change", function(){
    let maxSize = 40 * 1024 * 1024; //* 40MB 사이즈 제한
    let fileSize = this.files[0].size; //업로드한 파일용량

    if(fileSize > maxSize){
        alert("파일첨부 사이즈는 40MB 이내로 가능합니다.");
        $(this).val(''); //업로드한 파일 제거
        return;
    }
});

// image 파일 용량 체크
$("input[name=thumbnail]").on("change", function(){
    let maxSize = 5 * 1024 * 1024; //* 5MB 사이즈 제한
    let fileSize = this.files[0].size; //업로드한 파일용량

    if(fileSize > maxSize){
        alert("파일첨부 사이즈는 5MB 이내로 가능합니다.");
        $(this).val(''); //업로드한 파일 제거
        return;
    }
});

// video 게시글 수정 페이지 초기값 가져오기
function getModifyInfo(id) {
    $.ajax({
        type: "GET",
        url: host + '/tenSeconds/video/'+id,
        headers: {"Authorization": token},
        success: function (response) {
            $(".modify-title").val(response["title"]); // 제목
            $(".upload-content>textarea").text(response["content"]); // 게시물 설명
            $(".upload-button>button").attr("onclick", "videoModify("+response["id"]+")");
        }
    });
}

// video 게시글 수정
function videoModify(id) {
    let data = {
        "title" : $("#modify-title").val(),
        "content" : $("#modify-content>textarea").val(),
        "setTime" : $("#modify-time").val()
    }

    let modify_thumb = $("input[name='modify-thumbnail']");
    let thumbnail = modify_thumb[0].files;

    let formData = new FormData();

    formData.append("updateData", new Blob([JSON.stringify(data)], {type: "application/json"}));
    formData.append("thumbnail", thumbnail[0]);

    //ajax 를 통해 controller 와 연결
    $.ajax({
        type: "PUT",
        url: host + '/tenSeconds/video/'+id,
        contentType: false,
        processData: false,
        data: formData,
        headers: {"Authorization": token},
        success: function (result) {
            alert("수정 완료");
            window.location.href = my_record_main_page;
        }
    });
}

// video 게시글 삭제
function videoDelete(id) {
    let choice = confirm("해당 게시글물을 삭제 하시겠습니까?");
    if (choice) {
        $.ajax({
            type: "DELETE",
            url: host + '/tenSeconds/video/'+id,
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