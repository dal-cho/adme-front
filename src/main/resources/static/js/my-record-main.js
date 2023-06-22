$(document).ready(function(){
    getMyList(1);
});


// 내 게시글 전체 조회
function getMyList(currentNumber) {
    $.ajax({
        type: "GET",
        url: host+`/mypage/${currentNumber}`,
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
                myVideoPost(videoList[i], i);
            }

            // 메인화면 게시글 표시
            for (let i = 0; i < boardList.length; i++) {
                let title = boardList[i].title;
                let idx = boardList[i].idx;

                let tempHtml = `<div class="board-item-box">
                                    <div class="board-delete-box">
                                        <button class="board-item-button video-config-button" title="삭제" onclick="articleDelete(${idx})"></button>
                                    </div>
                                    <div class="board-item" onclick="boardModal(${idx})">
                                        <div class="board" >${title}</div>
                                    </div>
                                </div>`;

                $(".board-container").append(tempHtml);
            }

            myPagination(currentNumber, startPage, endPage, prev, next);
        }
    })
}

// 게시글 코드
function myVideoPost(article, index) {
    let tempHtml = `<div class="video-item" id="${index}">
                        <div class="video-delete-box">
                            <button class="video-config-button video-modify-button" title="수정" onclick="modifyLink(${article["id"]})"></button>
                            <button class="video-config-button video-delete-button" title="삭제" onclick="videoDelete(${article["id"]})"></button>
                        </div>
                        <div class="video-thumbnail adme-scale-animation" onclick="videoModal(${article["id"]})">
                            <img src="${"files/" + "thumb_" + article["uuid"] +".jpg"}" alt=${"video"+article["id"]+"_thumbnail"}>
                        </div>
                        <div class="video-title" onclick="videoModal(${article["id"]})">
                            <a class="title" href="#">${article["title"]}</a>
                        </div>
                    </div>`;
    $(".video-container").append(tempHtml);
}


// 페이지 버튼
function myPagination(currentNumber, startPage, endPage, prev, next) {
    let tempHtml = ``;

    // 이전 페이지가 있다면 < 표시
    if (prev) {
        tempHtml += `<div><a href="#" onclick="beforeClick(${currentNumber})">&lt;</a></div>`;
    }

    // 페이징 번호 표시
    for (let i = startPage; i <= endPage; i++) {
        if (currentNumber === i) {
            tempHtml += `<div><a href="#">${i}</a></div>`;
        } else {
            tempHtml += `<div><a href="#" onclick="getMyList(${i})">${i}</a></div>`;
        }
    }

    // 다음 페이지가 있다면 < 표시
    if (next) {
        tempHtml += `<div><a href="#" onclick="nextClick(${currentNumber})">&gt;</a></div>`;
    }

    $('.paging').html(tempHtml);
}

function beforeClick(currentNumber) {
    getMyList(currentNumber - 1);
}

function nextClick(currentNumber) {
    getMyList(currentNumber + 1);
}