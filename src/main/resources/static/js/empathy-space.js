$(document).ready(function () {
    $(".container").fadeIn(1000);
    $(".container1").fadeIn(1000);
    $(".menu").fadeIn(1000);
    $(".upload-button").fadeIn(1000);
    pageSelect();
    pageOver();
    pageLeave();
    getArticle(1); // paging
    $("#name").text(nickname + "님 환영합니다.")
    findNickname() // nickname 가져오기
});

// 업로드 버튼
function registryPage() {
    $(".container").hide();
    $(".container1").hide();
    $(".upload-button").hide();
    $(".registry-container").show();
    $(".registry-c1").fadeIn();
    $("#articleModal").fadeOut();

}

// 페이지버튼 클릭시 fill 이미지로 변경
function pageSelect() {
    //마우스 클릭한 곳의 이미지 값을 변화시켜준다. (다른 곳을 클릭하면 이전 클릭 기록은 지워준다.)
    $('.paging-num').on("click", function () {
        let id_check = $(this).attr("id");
        if (id_check.slice(0, 11) === "page-number") {
            for (let i = 1; i < 6; i++) {
                $('.paging-num').eq(i).attr("src", "img/num.png");
                $('.paging-num').eq(i).attr("value", "0");
            }
            // $(this).attr("src", "img/num-fill.png");
            $(this).attr("src", "img/num-fill.png");
            $(this).attr("value", "1");
        }
    });
}

// 페이징버튼에 마우스 올릴시 fill 이미지로 변경
function pageOver() {
    //마우스 올린 곳의 이미지 값을 변화시켜준다.
    $('.paging-num').mouseover(function () {
        let id_check = $(this).attr("id");
        let value_check = $(this).attr("value");
        if (id_check === "left-num-img") {
            $(this).attr("src", "img/left-num-fill.png");
        } else if (id_check === "right-num-img") {
            $(this).attr("src", "img/right-num-fill.png");
        } else if (value_check === "0" && id_check.slice(0, 11) === "page-number") {
            $(this).attr("src", "img/num-fill.png");
        }
    });
}

// 페이징버튼에서 마우스 내릴시 빈 이미지로 변경
function pageLeave() {
    //마우스가 위치를 벗어나면 이미지 값을 변화시킨다.
    $('.paging-num').mouseleave(function () {
        let id_check = $(this).attr("id");
        let value_check = $(this).attr("value");
        if (id_check === "left-num-img") {
            $(this).attr("src", "img/left-num.png");
        } else if (id_check === "right-num-img") {
            $(this).attr("src", "img/right-num.png");
        } else if (value_check === "0" && id_check.slice(0, 11) === "page-number") {
            $(this).attr("src", "img/num.png");
        }
    });
}

// nickname 가져오기 (index 페이지로 가지 않고 다른 페이지로 갈 경우)
let nickname = sessionStorage.getItem("nickname");
function findNickname() {
    if (!nickname) {
        $.ajax({
            type : "GET",
            url: `http://localhost:8080/finduser`,
            contentType : "application/json",
            data: JSON.stringify(),
            success: function (response) {
                sessionStorage.setItem("nickname", response)
                nickname = sessionStorage.getItem("nickname");
            }
        })
    }
}

// nickname이 null 값인 경우 변경 확인
function reload(){
    $("#name").text(nickname + "님 환영합니다.")
}

if (!nickname) { // 0.5초 뒤에 다시 띄워짐
    setInterval(reload, 500);
}

// 작성 글 페이징
function getArticle(curpage) {
    $.ajax({
        type: "GET",
        url: `space/${curpage}`,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            let list = response.data;
            let fullCount = response.count;
            $("#c1-posting").empty();
            $("#nowPage").empty();

            let startPage = response.startPage;
            let endPage = response.endPage;
            let prev = response.prev;
            let next = response.next

            $("#nowPage").append(curpage + "페이지")
            for (let i = 0; i < list.length; i++) {
                num = i + 1;
                makeListPost(list[i], num, curpage); // 네모 칸 리스트 출력
            }
            makePagination(fullCount, curpage, startPage, endPage, prev, next); // 아래 하단 페이징
        }
    })
}

// 네모 칸 리스트 출력
function makeListPost(board, num) {
    let title = board.title;
    if(title.length >= 20) {
        title = title.substr(0,20) + "...";
    }
    let content = board.main;
    let modi = board.modifiedAt;
    let mode = modi.substr(0, 10);
    let idx = board.idx;
    let tempHtml = `<div class="item"><button class="makeListPostBtn" onclick="allRegistry(${idx}); findComment(${idx})">
                        <div class="num" style="display: none">${num}</div>
                        <div class="title" style="font-size: 16px;">${title}</a></div>
                        <div class="date" style="display: none">${mode}</div>
                   </div>
`
    $("#c1-posting").append(tempHtml);
}


// 아래 하단 페이징
function makePagination(count, curpage, startPage, endPage, prev, next) {
    let tempHtml = ``;
    if (prev) {
        tempHtml += `<li class="left-number" value="before" ><button type="button" onclick="beforeClick(${curpage})"><img type="button" class="paging-num" id="left-num-img" value="0" src="img/left-num.png"></button></li>`
    }

    // 페이징 번호 표시
    for (let i = startPage; i <= endPage; i++) {
        if(curpage ==i) {
            tempHtml += `
<li class="page-number" value="${i}" id="curPage"><img class="paging-num" id="page-number1-img" value="0" src="img/num.png"></li>
      `;
        } else {
            tempHtml += `
<li class="page-number" value="${i}" id="otherPage"><img class="paging-num" id="page-number1-img" value="0" onclick="getArticle(${i})" src="img/num.png"></li>
`;
        }
    }
    if (next) { // 다음 버튼
        tempHtml += `<li class="right-number" value="after"><button type="button" id="nextButton" onclick="nextClick(${curpage})"><img class="paging-num" id="right-num-img" value="0" src="img/right-num.png"></button></li>`
    }
    $('#board-pages').html(tempHtml);
}

function beforeClick(curpage){
    getArticle(curpage-1);
}
function nextClick(curpage) {
    getArticle(curpage+1);
}


// 게시글 등록하기
function saveArticle() {
    let form_data = new FormData()
    form_data.append("title", $("#h1").val())
    form_data.append("main", $("#h2").val())
    form_data.append("nickname", nickname)

    $.ajax({
        type: "POST",
        url: `/registry`,
        data: form_data,
        contentType: false,
        processData: false,
        success: function (response) {
            alert("성공적으로 업로드 되었습니다.");
            location.href = "empathy-space.html"; // 페이지 변환
        }
    });
}


// 게시글 상세 페이지
function allRegistry(idx) {
    $.ajax({
        type: "GET",
        url: `/registry?idx=${idx}`,
        data: {},
        contentType: false,
        processData: false,
        success: function (response) {
            //alert(JSON.stringify(response)) // 받아오는 값 모두 보기
            let created = response['createdAt']
            let modified = response['modifiedAt']
            let idx = response['idx']
            let title = response['title']
            let main = response['main']
            let registryNickname = response['nickname']

            // 0000-00-00 형식으로 출력
            let date = new Date(created)
            let newcreated = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

            $("#RegistryId").html(idx);
            $("#user").html(registryNickname)
            $("#created").html(newcreated)
            $("#modal-title").html(title)
            $("#modal-main").html(main)

            $("#articleModal").fadeIn();
            $(".registry-c1").fadeOut();
        }
    });
}

function closeModal() {
    $("#articleModal").fadeOut();
}


// 댓글 등록하기
function Comment() {
    let form_data = new FormData()
    form_data.append("comment", $("#comment").val())
    form_data.append("nickname", nickname)
    form_data.append("registryId",$("#RegistryId").html())
    form_data.append("registryNickname",$("#user").text()) // 게시글 작성자

    let registryId = $("#RegistryId").html()
    $.ajax({
        type: "POST",
        url: `/comment`,
        data: form_data,
        contentType: false,
        processData: false,
        success: function (response) {
            // // 댓글 창 값 없애기(input 칸 비우기)
            $("#comment").val("")

            // 댓글 입력 후 댓글 db reload
            findComment(registryId)
        }
    });
}


function findComment(idx){ // comment db 가져오기
    $("#commentList").text("") // 초기화
    $.ajax({
        type: "GET",
        url: `/comment?idx=${idx}`,
        data: {},
        contentType: false,
        processData: false,
        success: function (response) {
            for (let i=0; i<response.length; i++){
                let commentName = response[i]["nickname"]
                let comment = response[i]["comment"]
                let commentId = response[i]["idx"]
                let registryNickname = response[i]["registryNickname"]
                let temp_html
                console.log("registryNickname : " + registryNickname)

                if (registryNickname == commentName) { // 게시글 작성자인 경우

                    // 댓글 작성자인 경우
                    if (nickname == commentName) { // 댓글 작성자인 경우
                        temp_html = `<div id="commentParent" class="${commentId}" ><a id="${commentId}-commentName" class="writerCommentName">${commentName} : 작성자 </a><a id="${commentId}-comment">${comment}</a>
<button id="updateBtn-${commentId}" class="updateBtn" type="button" onclick="updateCommentBtn(${commentId})">수정</button>
<button id="deleteBtn-${commentId}" class="deleteBtn" type="button" onclick="checkDelete(${commentId})">삭제</button></div> 
<a><input id="updateCommentInput-${commentId}" class="updateCommentInput" style="display: none"><button id="updateAftersaveBtn-${commentId}" class="updateAftersaveBtn" style="display: none" type="button" onclick="afterUpdateComment(${commentId})">저장</button> </a><br>`
                    }

                    // 댓글 작성자가 아닌 경우
                    else{
                        temp_html= `<div id="commentParent" class="${commentId}" style="display:block;"><a id="${commentId}-commentName" class="commentName">${commentName} : 작성자 </a><a id="${commentId}-comment">${comment}</a></div> <br><input id="updateCommentBtn" style="display: none">`
                    }

                } else{ // 댓글 작성자가 아닌 경우

                    // 댓글 작성자인 경우
                    if (nickname == commentName) { // 댓글 작성자인 경우
                        temp_html = `<div id="commentParent" class="${commentId}" ><a id="${commentId}-commentName" class="writerCommentName">${commentName}</a><a id="${commentId}-comment">${comment}</a>
<button id="updateBtn-${commentId}" class="updateBtn" type="button" onclick="updateCommentBtn(${commentId})">수정</button>
<button id="deleteBtn-${commentId}" class="deleteBtn" type="button" onclick="checkDelete(${commentId})">삭제</button></div> 
<a><input id="updateCommentInput-${commentId}" class="updateCommentInput" style="display: none"><button id="updateAftersaveBtn-${commentId}" class="updateAftersaveBtn" style="display: none" type="button" onclick="afterUpdateComment(${commentId})">저장</button> </a><br>`
                    }

                    // 댓글 작성자가 아닌 경우

                    else {
                        temp_html= `<div id="commentParent" class="${commentId}" style="display:block;"><a id="${commentId}-commentName" class="commentName">${commentName} </a><a id="${commentId}-comment">${comment}</a></div> <br><input id="updateCommentBtn" style="display: none">`
                    }

                }


                $("#commentList").append(temp_html)

            }
        }
    })
}

function updateCommentBtn(commentId) {
    // 수정 버튼을 누르면 수정 버튼은 사라지고 그 글이 input 칸안에 들어가야 함

    let num = commentId+"-comment" // id 값을 가져옴
    let updateBtn = "#updateBtn-" + commentId
    let deleteBtn = "#deleteBtn-"+ commentId

    $(updateBtn).hide() // 수정 버튼 숨김
    $(deleteBtn).hide() // 삭제 버튼 숨김

    let comment = document.getElementById(num).innerText // 댓글 값을 가져온다.
    let updateCommentInput = "#updateCommentInput-" + commentId // 수정 입력 input 창
    let updateAftersaveBtn = "#updateAftersaveBtn-" + commentId // 저장 버튼

    $(updateCommentInput).show() // 수정 입력 input 창 보여주기
    $(updateAftersaveBtn).show() // 저장 버튼 보여주기
    $(updateCommentInput).val(comment) // 수정 전 값 input 창에 띄워주기
}


function afterUpdateComment(commentId){     // 저장 버튼을 누르면 그 값이 원래 값 대신 들어가야 함
    let updateCommentInput = "#updateCommentInput-"+commentId // 수정 입력 input 창
    let updateAftersaveBtn = "#updateAftersaveBtn-" + commentId // 저장 버튼

    $(updateCommentInput).hide(); // input 숨기기
    $(updateAftersaveBtn).hide() // 저장 버튼 숨기기

    let comment = $(updateCommentInput).val(); // 수정 댓글
    let queryNum = "#"+commentId+"-comment" // id 값을 가져옴 + 제이쿼리 이용
    $(queryNum).text("") // 기존 값 초기화
    $(queryNum).text(comment) // 수정 값 추가

    let updateBtn = "#updateBtn-" + commentId // 수정 버튼
    let deleteBtn = "#deleteBtn-"+ commentId // 삭제 버튼

    $(updateBtn).show() // 수정 버튼 보여주기
    $(deleteBtn).show() // 삭제 버튼 보여주기

    let registryId = $("#RegistryId").html();
    let registryNickname = $("#user").text() // 게시글 작성자

    let RegistryComment = {
        nickname: nickname,
        comment: comment,
        registryId: registryId,
        registryNickname: registryNickname
    }

    $.ajax({
        type: "PUT",
        url: `/comment/${commentId}/registry/${registryId}`,
        dataType:'json',
        data: JSON.stringify(RegistryComment),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            console.log("success")
        }
    })

}

function checkDelete(commentId) { // 삭제 여부를 묻고 삭제하겠다고 하면 deleteComment 호출
    let checkDelete = confirm("정말 삭제하실건가요?")
    if (checkDelete) {
        deleteComment(commentId)
    }
}

function deleteComment(commentId) {
    let num = commentId+"-comment" // id 값을 가져옴
    let comment = document.getElementById(num).innerText // 댓글 값을 가져온다.
    let registryId = $("#RegistryId").html();
    let registryNickname = $("#user").text() // 게시글 작성자

    let RegistryComment = {
        nickname: nickname,
        comment: comment,
        registryId: registryId,
        registryNickname: registryNickname
    }

    $.ajax({
        type: "DELETE",
        url: `/comment/${commentId}/registry/${registryId}`,
        dataType:'json',
        data: JSON.stringify(RegistryComment),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {

        }
    })
    let query = "." + commentId
    let queryEnd = " ." + commentId
    $(query).load(window.location.href + queryEnd) // 삭제 댓글만 새로고침
}