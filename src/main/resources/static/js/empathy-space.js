$(document).ready(function(){
    $(".container").fadeIn(1000);
    $(".container1").fadeIn(1000);
    $(".menu").fadeIn(1000);
    $(".upload-button").fadeIn(1000);
    pageSelect();
    pageOver();
    pageLeave();
    getArticle(1); // paging
});

// 업로드 버튼
function registryPage(){
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
    $('.paging-num').on("click",function(){
        let id_check = $(this).attr("id");
        if (id_check.slice(0,11) === "page-number"){
            for (let i=1; i<6; i++){
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
    $('.paging-num').mouseover(function(){
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
function pageLeave(){
    //마우스가 위치를 벗어나면 이미지 값을 변화시킨다.
    $('.paging-num').mouseleave(function(){
        let id_check = $(this).attr("id");
        let value_check = $(this).attr("value");
        if (id_check === "left-num-img"){
            $(this).attr("src", "img/left-num.png");
        }else if (id_check === "right-num-img"){
            $(this).attr("src", "img/right-num.png");
        }else if (value_check === "0" && id_check.slice(0,11) === "page-number"){
            $(this).attr("src", "img/num.png");
        }
    });
}

// nickname 가져오기
let nickname = sessionStorage.getItem("nickname");


// 작성 글 페이징
function getArticle(curpage) {
    $.ajax({
        type: "GET",
        url: `space/${curpage}`,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            let list = response.data; // 조회된 데이터
            let fullCount = response.count; // 전체 페이지의 수
            $("#c1-posting").empty();

            for (let i = 0; i < list.length; i++) {
                num = i + 1;
                makeListPost(list[i], num, curpage); // 네모 칸 리스트 출력
            }
            makePagination(fullCount, curpage); // 아래 하단 페이징
        }
    })
}


// 네모 칸 리스트 출력
function makeListPost(board, num) {
    let title = board.title;
    let content = board.main;
    let modi = board.modifiedAt;
    let mode = modi.substr(0, 10);
    let idx = board.idx;
    let tempHtml = `<div class="item"><button onclick="allRegistry(${idx})">
                        <div class="num">${num}</div>
                        <div class="title">${title}</a></div>
                        <div class="date">${mode}</div>
                   </div>
`
    $("#c1-posting").append(tempHtml);
}

// 아래 하단 페이징
function makePagination(count, curpage) {
    let tempHtml = ``;
    for (let i = 0; i < count; i++) {
        if (i + 1 == curpage) {
            // <a href="#" class="num on">${i + 1}</a>
            tempHtml += `
<li class="page-number" value="${i + 1}"><img class="paging-num" id="page-number1-img" value="0" src="img/num.png"></li>
      `;

        } else { // <a href="#" class="num" onclick="getArticle(${i + 1})">${i + 1}</a>
            tempHtml += `
<li class="page-number" value="${i + 1}"><img class="paging-num" id="page-number1-img" value="0" onclick="getArticle(${i + 1})" src="img/num.png"></li>
`;
        }
    }
    $('#board-pages').html(tempHtml);
}


// 게시글 등록하기
function saveArticle() {
    let form_data = new FormData()
    form_data.append("title", $("#h1").val())
    form_data.append("main", $("#h2").val())
    form_data.append("nickname",nickname)

    $.ajax({
        type: "POST",
        url: `/registry`,
        data: form_data,
        contentType: false,
        processData: false,
        success: function (response) {
            alert("성공적으로 업로드 되었습니다.");
            // sessionStorage.setItem("image_idx", response['idx']);

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
            let username = response['nickname']

            // 0000-00-00 형식으로 출력
            let date = new Date(created)
            let newcreated = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

            $("#user").html(username)
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