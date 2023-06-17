$(document).ready(function(){
    getMyList(1);
});
function getMyList(currentNumber) {
    $.ajax({
        type: "GET",
        url: host+`/tenSeconds/my/list/${currentNumber}`,
        headers: {"X-AUTH-TOKEN": cookie},
        success: function (response) {
            // alert("getList 동작시작");
            let videoList = `${response["videoList"]}`;
            let boardList = `${response["boardList"]}`;

            let startPage = `${response["startPage"]}`;
            let endPage = `${response["endPage"]}`; // 마지막 페이지 번호
            let prev = `${response["prev"]}`; // 이전 버튼
            let next = `${response["next"]}`; // 다음 버튼

            $(".video-container").empty();
            $(".board-container").empty();

            for (let i=0; i<videoList.length; i++) {
                videoListPost(videoList[i], i);
            }

            // 메인화면 게시글 표시
            for (let i = 0; i < boardList.length; i++) {
                let title = boardList[i].title;
                let idx = boardList[i].idx;

                let tempHtml = `<div class="board-item" onclick="boardModal(${idx})">
                        <div class="board" >${title}</div>
                    </div>`;

                $(".board-container").append(tempHtml);
            }

            makePagination(currentNumber, startPage, endPage, prev, next);
        }
    })
}

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