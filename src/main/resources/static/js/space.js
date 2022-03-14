$(document).ready(function(){
    $(".container").fadeIn(1000);
    $(".container1").fadeIn(1000);
    $(".menu").fadeIn(1000);
    $(".upload-button").fadeIn(1000);
    pageSelect();
    pageOver();
    pageLeave();
    // 게시물
    showMain();
    // paging
    getArticle(1);
})

//페이지버튼 클릭시 fill 이미지로 변경
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

//페이징버튼에 마우스 올릴시 fill 이미지로 변경
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

//페이징버튼에서 마우스 내릴시 빈 이미지로 변경
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

// 게시물
function showMain() {
    $.ajax({
        type: "GET",
        url: `/space`,
        data: {},
        success: function (response) {
            let respon = response.reverse();
            for (let i = 0; i < respon.length; i++) {
                let idx = respon[i]['idx'];
                let title = respon[i]['title'];
                let main = respon[i]['main'];
                /*
                for (let i = 0; i < response.length; i++) {
                    let idx = response[i]['idx'];
                    let title = response[i]['title'];
                    let main = response[i]['main']; */
                if(title.length >= 15) {
                    title = title.substr(0,15) + "...";
                }
                let temp_html = `
                            <li class="item"><div id="${idx}" style="font-size: 20px; text-align: center; margin-top: 60px; padding-left: 5px; padding-right: 5px ">${title}</div></li>
                        `
                $("#c1-posting").append(temp_html);

            }
        }
    });
}

// paging
function getArticle(curpage) {
    $.ajax({
        type: "GET",
        url: `space/${curpage}`,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            let list = response.data;
            let fullCount = response.count;
            $("#c1-posting").empty();
            for (let i = 0; i < list.length; i++) {
                num = i + 1;
                makeListPost(list[i], num, curpage);
            }
            makePagination(fullCount, curpage);
        }
    })
}

function makeListPost(board, num) {
    let title = board.title;
    let content = board.main;
    let modi = board.modifiedAt;
    let mode = modi.substr(0, 10);
    let idx = board.idx;
    let tempHtml = `<div class="item" onclick="window.location.href='space.html?idx=${idx}'">
                        <div class="num">${num}</div>
                        <div class="title">${title}</a></div>
                        <div class="date">${mode}</div>
                   </div>`
    $("#c1-posting").append(tempHtml);
}

function makePagination(count, curpage) {
    let tempHtml = ``;
    for (let i = 0; i < count; i++) {
        if (i + 1 == curpage) {
            tempHtml += `<a href="#" class="num on">${i + 1}</a>`;
        } else {
            tempHtml += `<a href="#" class="num" onclick="getArticle(${i + 1})">${i + 1}</a>`;
        }
    }
    $('#board-pages').html(tempHtml);
}