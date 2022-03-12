$(document).ready(function(){
    $(".container").fadeIn(1000);
    $(".container1").fadeIn(1000);
    $(".menu").fadeIn(1000);
    $(".upload-button").fadeIn(1000);
    pageSelect();
    pageOver();
    pageLeave();
})

//페이지번호 클릭시 fill 이미지로 변경
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

//페이징 마우스 올릴시 fill 이미지로 변경
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

//페이징 마우스 내릴시 빈 이미지로 변경
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