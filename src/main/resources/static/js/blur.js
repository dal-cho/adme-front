$(document).ready(function () {
    $(".container").fadeIn(1000);
    $(".container1").fadeIn(1000);
    $(".menu").fadeIn(1000);
    $(".upload-button").fadeIn(1000);
    pageSelect();
    pageOver();
    pageLeave();
    testBox();
    needComment()
});

// 업로드 버튼
function registryPage() {
    alert("로그인 후 이용가능합니다.")
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


function testBox() {
    let temp = `<li class="item" id="registry-item0"><button id="detail-button" onclick="detail()"><div class="registry-box">예시로 보여주는 페이지 입니다.</div></button></li>
            <li class="item" id="registry-item1"><div class="registry-box">테스트 박스</div></li>
            <li class="item" id="registry-item2"><div class="registry-box">공감공간 게시글 입니다.</div></li>
            <li class="item" id="registry-item3"><div class="registry-box">로그인을 하면 더 많은 게시글을 볼 수 있습니다.</div></li>
            <li class="item" id="registry-item4"><div class="registry-box">테스트 박스</div></li>
            <li class="item" id="registry-item5"><div class="registry-box">테스트 박스</div></li>
            <li class="item" id="registry-item6"><div class="registry-box">테스트 박스</div></li>
            <li class="item" id="registry-item7"><div class="registry-box">테스트 박스</div></li>
            <li class="item" id="registry-item8"><div class="registry-box">공감공간 게시글 둘러보기 페이지입니다.</div></li>`
    $("#c1-posting").append(temp)

    document.getElementById("registry-item1").style = "filter: blur(6px);"
    document.getElementById("registry-item2").style = "filter: blur(6px);"
    document.getElementById("registry-item3").style = "filter: blur(6px);"
    document.getElementById("registry-item4").style = "filter: blur(6px);"
    document.getElementById("registry-item5").style = "filter: blur(6px);"
    document.getElementById("registry-item6").style = "filter: blur(6px);"
    document.getElementById("registry-item7").style = "filter: blur(6px);"
    document.getElementById("registry-item8").style = "filter: blur(6px);"

}

function needComment() {
    let temp = ` <li class="item1" id="num-1"> 크리스마스에 혼자 입니다. 너무 슬퍼요. </li>
                        <li class="item1" id="num-2"> 크리스마스에 혼자 입니다. 너무 슬퍼요. </li>
                        <li class="item1" id="num-3"> 크리스마스에 혼자 입니다. 너무 슬퍼요. </li>
                        <li class="item1" id="num-4"> 크리스마스에 혼자 입니다. 너무 슬퍼요. </li>
                        <li class="item1" id="num-5"> 크리스마스에 혼자 입니다. 너무 슬퍼요. </li>
                        <li class="item1" id="num-6"> 크리스마스에 혼자 입니다. 너무 슬퍼요. </li>`

    $(".items1").append(temp)
    document.getElementById("num-2").style = "filter: blur(6px);"
    document.getElementById("num-3").style = "filter: blur(6px);"
    document.getElementById("num-4").style = "filter: blur(6px);"
    document.getElementById("num-5").style = "filter: blur(6px);"

    document.getElementById("num-6").style = "filter: blur(6px);"




}

// 이전 버튼 및 다음 버튼
document.getElementById("nextButton").style = "border: none; background: inherit;"
document.getElementById("beforeButton").style = "border: none; background: inherit;"

function detail() {
    alert("로그인 후 이용가능합니다.")
}



