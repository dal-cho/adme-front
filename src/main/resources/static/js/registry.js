$(document).ready(function () {
    localStorage.setItem("article", "default")
    let queryString = window.location.search
    if (queryString) {
        saveToken(queryString)
    }
});

function saveToken(queryString) {
    let urlParams = new URLSearchParams(queryString)
    window.localStorage.setItem("token", urlParams.get("token"))
    window.localStorage.setItem("nickname", urlParams.get("name"))
    window.history.replaceState({}, document.title, "https://www.admee.site/templates/registry.html");
}

// board 모달 열기
function boardModal(idx) {
    window.localStorage.setItem("id", idx)
    allArticle(idx);
    $(".board-modal-container").fadeIn(200);
    $(".board-modal-content").fadeIn(200);
}

// 작성 글 페이징
function mainArticle(curpage) {
    $.ajax({
        type: "GET",
        url: host + `/registry/${curpage}`,
        headers: {"Authorization": token},
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            let list = response["content"]; // 게시물 리스트
            let startPage = response["startPage"];
            let endPage = response["endPage"]; // 마지막 페이지 번호
            let prev = response["prev"]; // 이전 버튼
            let next = response["next"]; // 다음 버튼
            let boardContainer = $(".board-container");

            boardContainer.empty(); // 게시글 초기화

            if (list) {
                // 메인화면 게시글 표시
                for (let i = 0; i < list.length; i++) {
                    let title = list[i].title;
                    let idx = list[i].idx;

                    let tempHtml = `<div class="board-item adme-scale-animation" onclick="boardModal(${idx})">
                                    <div class="board" >${title}</div>
                                </div>`;

                    boardContainer.append(tempHtml);
                }
                makePagination(curpage, startPage, endPage, prev, next); // 아래 하단 페이징
            }

        }
    })
}

// 공감이 필요해요
function sideArticle() {
    $.ajax({
        type: "GET",
        url: host + `/side-registry`,
        headers: {"Authorization": token},
        data: {},
        contentType: false,
        processData: false,
        success: function (response) {
            let sideBoardBox = $(".side-board-box");
            sideBoardBox.empty();

            switch (response.length) {
                case 0 :
                    $(".side-board-mark").text("It has become a world where everyone can empathize!");
                    break;

                default :
                    for (let i = 0; i < response.length; i++) {
                        let title = response[i].title;
                        let idx = response[i].idx;
                        let temp = `<div class="side-board-item adme-scale-animation" onclick="boardModal(${idx})">
                                        <div class="side-board-item-title">${title}</div>
                                    </div>`
                        sideBoardBox.append(temp)
                    }
            }
        }
    })
}

// 아래 하단 페이징
function makePagination(curpage, startPage, endPage, prev, next) {
    let tempHtml = ``;
    // 이전 페이지가 있다면 < 표시
    if (prev) {
        tempHtml += `<div><a href="#" onclick="beforeClick(${curpage})">&lt;</a></div>`
    }

    // 페이징 번호 표시
    for (let i = startPage; i <= endPage; i++) {
        if (curpage === i) {
            tempHtml += `<div><a href="#">${i}</a></div>`;
        } else {
            tempHtml += `<div><a href="#" onclick="mainArticle(${i})">${i}</a></div>`;
        }
    }

    // 다음 페이지가 있다면 < 표시
    if (next) {
        tempHtml += `<div><a href="#" onclick="nextClick(${curpage})">&gt;</a></div>`
    }

    $('.paging').html(tempHtml);
}

function beforeClick(curpage) {
    mainArticle(curpage - 1);
}

function nextClick(curpage) {
    mainArticle(curpage + 1);
}


// 게시글 상세 페이지
function allArticle(idx) {
    $.ajax({
        type: "GET",
        url: host + `/registry?idx=${idx}`,
        headers: {"Authorization": token},
        data: {},
        contentType: false,
        processData: false,
        success: function (response) {
            let created = response['createdAt'];
            let modified = response['modifiedAt'];
            let idx = response['idx'];
            let title = response['title'];
            let main = response['main'];
            let registryNickname = response['nickname'];
            // 0000-00-00 형식으로 출력
            let date = new Date(modified);
            let newcreated = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

            $(".board-title").html(title);
            $(".board-user-nickname").html(registryNickname);
            $(".board-date").html(newcreated);
            $(".board-content>textarea").text(main);

            // onclick 의 값이 잘 변경 되는지 체크
            $(".board-comment-save").attr("onclick", "comment(" + idx + ")");

            findComment(idx);
        }
    });
}

// 댓글 등록하기
function comment(idx) {
    let form_data = {
        "nickname": nickname,
        "comment": $('.board-comment-writing-container>textarea').val(),
        "registryIdx": idx
    }

    $.ajax({
        type: "POST",
        url: host + `/comment`,
        headers: {"Authorization": token},
        data: JSON.stringify(form_data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        processData: false,
        success: function (response) {
            // 댓글 입력 후 댓글 db reload
            findComment(idx);
        }
    });
}

// 댓글 조회
function findComment(idx) { // comment db 가져오기
    $(".board-comments-box").empty(); // 초기화

    $.ajax({
        type: "GET",
        url: host + `/comment?idx=${idx}`,
        headers: {"Authorization": token},
        data: {},
        contentType: false,
        processData: false,
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                commentPost(response[i], idx);
            }
        }
    })
}

// 댓글 post
function commentPost(article, registryIdx) {
    let commentId = article["commentId"];
    let commentNickname = article["commentNickname"];
    let comment = article["comment"];
    let registryNickname = article["registryNickname"];
    let modifiedAt = article["modifiedAt"];
    let date = modifiedAt.replaceAll("T", " ").replaceAll("-", ".");
    let temp_html;

    if (registryNickname === commentNickname) { // 게시글 작성자인 경우
        if (nickname === commentNickname) { // 댓글 작성자인 경우
            temp_html = `<div class="line" style="border: .1px dashed rgba(131,128,128,0.18);"></div>
                         <div class="board-comments-item" id="${"commentId-" + commentId}">
                            <div class="board-comment-left-item">
                                <div class="board-comments-userNickname">&#9989; ${commentNickname}</div>
                                <div class="board-comments-item-date">${date}</div>
                                <div class="board-comment">${comment}</div>
                                <textarea class="board-comment-modify-box"></textarea>
                            </div>
                            <div class="board-comment-right-item">
                                <button class="board-comment-btn board-comment-delete" onclick="checkDelete(${commentId}, ${registryIdx})">DELETE</button>
                                <button class="board-comment-btn board-comment-modify" onclick="updateCommentBtn(${commentId})">Modify</button>
                                <button class="board-comment-btn board-comment-modify-save" onclick="afterUpdateComment(${commentId}, ${registryIdx})">SAVE</button>
                            </div>
                         </div>`
        } else { // 댓글 작성자가 아닌 경우
            temp_html = `<div class="line" style="border: .1px dashed rgba(131,128,128,0.18);"></div>
                         <div class="board-comments-item" id="${"commentId-" + commentId}">
                            <div class="board-comment-left-item" id="${"commentId-" + commentId}">
                                <div class="board-comments-userNickname">&#9989; ${commentNickname}</div>
                                <div class="board-comments-item-date">${date}</div>
                                <div class="board-comment">${comment}</div>
                            </div>
                         </div>`
        }

    } else { // 게시글 작성자가 아닌 경우
        if (nickname === commentNickname) { // 댓글 작성자인 경우
            temp_html = `<div class="line" style="border: .1px dashed rgba(131,128,128,0.18);"></div>
                         <div class="board-comments-item" id="${"commentId-" + commentId}">
                             <div class="board-comment-left-item">
                                 <div class="board-comments-userNickname">${commentNickname}</div>
                                 <div class="board-comments-item-date">${date}</div>
                                 <div class="board-comment">${comment}</div>
                                 <textarea class="board-comment-modify-box"></textarea>
                             </div>
                             <div class="board-comment-right-item">
                                 <button class="board-comment-btn board-comment-delete" onclick="checkDelete(${commentId}, ${registryIdx})">DELETE</button>
                                 <button class="board-comment-btn board-comment-modify" onclick="updateCommentBtn(${commentId})">Modify</button>
                                 <button class="board-comment-btn board-comment-modify-save" onclick="afterUpdateComment(${commentId}, ${registryIdx})">SAVE</button>
                             </div>
                         </div>`
        } else { // 댓글 작성자가 아닌 경우
            temp_html = `<div class="line" style="border: .1px dashed rgba(131,128,128,0.18);"></div>
                         <div class="board-comments-item" id="${"commentId-" + commentId}">
                             <div class="board-comment-left-item">
                                 <div class="board-comments-userNickname">${commentNickname}</div>
                                 <div class="board-comments-item-date">${date}</div>
                                 <div class="board-comment">${comment}</div>
                             </div>
                         </div>`
        }
    }
    $(".board-comment-writing-container>textarea").val("");
    $(".board-comments-box").append(temp_html);
}

// 댓글 수정버튼 클릭시 해당 댓글이 input 상자로 변경 ,수정 후 저장시 input 상자값 저장
// 댓글 수정 버튼
function updateCommentBtn(commentId) {
    showCommentId = commentId;
    let parents = '#commentId-' + commentId;
    let tempComment = $(parents + '>.board-comment-left-item>.board-comment').text();

    $(parents + '>.board-comment-left-item>.board-comment').hide(); // 댓글 div none
    $(parents + '>.board-comment-left-item>textarea').val(tempComment);
    $(parents + '>.board-comment-left-item>.board-comment-modify-box').show(); // 수정 입력창 block

    $(parents + '>.board-comment-right-item>.board-comment-modify').hide(); // 수정버튼 none
    $(parents + '>.board-comment-right-item>.board-comment-modify-save').show(); // 저장버튼 block
}

// 수정된 댓글 저장
function afterUpdateComment(commentId, registryIdx) {  // 저장 버튼을 누르면 그 값이 원래 값 대신 들어가야 함
    let parents = '#commentId-' + commentId;
    let saveComment = $(parents + '>.board-comment-left-item>textarea').val();

    let RegistryComment = { // 수정
        "nickname": nickname,
        "comment": saveComment,
        "registryIdx": registryIdx
    }

    $.ajax({
        type: "PUT",
        url: host + `/comment/${commentId}`,
        headers: {"Authorization": token},
        data: JSON.stringify(RegistryComment),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            allArticle(registryIdx);
        }
    });
}

// 댓글 삭제
function checkDelete(commentId, registryIdx) { // 삭제 여부를 묻고 삭제하겠다고 하면 deleteComment 호출
    let checkDelete = confirm("정말 삭제하실건가요?");
    if (checkDelete) {
        deleteComment(commentId, registryIdx);
        allArticle(registryIdx);
    }
}

function deleteComment(commentId, registryIdx) {
    $.ajax({
        type: "DELETE",
        url: host + `/comment/${commentId}`,
        headers: {"Authorization": token},
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
        }
    })
}

// 댓글 수정 저장버튼 비활성화 & 수정버튼 활성화
function hideCommentSave(id) {
    let parents = '#commentId-' + id;

    $(parents + '>.board-comment-left-item>.board-comment').show();
    $(parents + '>.board-comment-left-item>.board-comment-modify-box').hide();

    $(parents + '>.board-comment-right-item>.board-comment-modify').show(); // 수정버튼 none
    $(parents + '>.board-comment-right-item>.board-comment-modify-save').hide(); // 저장버튼 block
}