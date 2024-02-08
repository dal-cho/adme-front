// 내 게시글 전체 조회
function getMyList(currentNumber) {
    $.ajax({
        type: "GET",
        url: host+`/mypage?curPage=${currentNumber}`,
        headers: {"Authorization": token},
        success: function (response) {
            // alert("getList 동작시작");
            let content = response["content"];
            let registryList = content[0];
            let videoList = content[1];

            let startPage = response["startPage"];
            let endPage = response["endPage"]; // 마지막 페이지 번호
            let prev = response["prev"]; // 이전 버튼
            let next = response["next"]; // 다음 버튼
            let boardContainer = $(".board-container");
            let videoContainer = $(".video-container");

            videoContainer.empty();
            boardContainer.empty();

            // 메인화면 게시글 표시
            for (let i = 0; i < registryList.length; i++) {
                let title = registryList[i].title;
                let idx = registryList[i].idx;

                let tempHtml = `<div class="board-item-box">
                                    <div class="board-delete-box">
                                    <button class="board-update-button video-config-button" title="수정" onclick="articleUpdateLink(${idx})"></button>
                                        <button class="board-item-button video-config-button" title="삭제" onclick="articleDelete(${idx})"></button>
                                    </div>
                                    <div class="board-item" onclick="boardModal(${idx})">
                                        <div class="board" >${title}</div>
                                    </div>
                                </div>`;

                boardContainer.append(tempHtml);
            }

            for (let i=0; i<videoList.length; i++) {
                let id = videoList[i].id;
                let title = videoList[i].title;
                let s3ThumbnailUrl = videoList[i].s3ThumbnailUrl;

                let tempHtml = `<div class="video-item" id=${i}>
                        <div class="video-delete-box">
                            <button class="video-config-button video-modify-button" title="수정" onclick="modifyLink(${id})"></button>
                            <button class="video-config-button video-delete-button" title="삭제" onclick="videoDelete(${id})"></button>
                        </div>
                        <div class="video-thumbnail" onclick="videoModal(${id})">
                            <img src="${s3ThumbnailUrl}" class="video-thumbnail-ratio" alt="video+${i}+_thumbnail">
                        </div>
                        <div class="video-title" onclick="videoModal(${id}})">
                            <a class="title" href="#">${title}</a>
                        </div>
                    </div>`;
                videoContainer.append(tempHtml);
            }

            myPagination(currentNumber, startPage, endPage, prev, next);
        }
    })
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

    // 다음 페이지가 있다면 > 표시
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