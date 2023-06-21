$(document).ready(function(){
    navLink();
    userInfo();
});

// html 파일 경로값
let host = "http://localhost:8080";
let login_page = "http://localhost:63342/front/front.main/static/templates/signin.html";
let index_page = "http://localhost:63342/front/front.main/static/templates/everyone-record-main.html";
let everyone_record_main_page = "http://localhost:63342/front/front.main/static/templates/everyone-record.html";
let everyone_record_upload_page = "http://localhost:63342/front/front.main/static/templates/everyone-record-upload.html";
let everyone_record_modify_page = "http://localhost:63342/front/front.main/static/templates/everyone-record-modify.html";
let sympathetic_space_main_page = "http://localhost:63342/front/front.main/static/templates/empathy-space.html";
let sympathetic_space_upload_page = "http://localhost:63342/front/front.main/static/templates/empathy-space-upload.html";
let my_record_main_page = "http://localhost:63342/front/front.main/static/templates/my-record.html";

// 쿠키값
let cookie = getCookie("TokenCookie");

// 모달 닫기위한 위치값
let video_modal = document.getElementById("modal");
let registry_modal = document.getElementById("board-Modal");

// 기타 변수
let showCommentId;
let nickname = "";


// 네비게이션바 경로 설정
function navLink() {
    $("#my_record").attr("href", my_record_main_page);
    $("#everyone_record").attr("href", everyone_record_main_page);
    $("#sympathetic_space").attr("href", sympathetic_space_main_page);
}

// 비디오 업로드 및 수정 페이지 경로 설정
function videoUploadLink() {
    document.location.href = everyone_record_upload_page;
}
function modifyLink(id) {
    getModifyInfo(id);
    document.location.href = everyone_record_modify_page;
}

// 공감공간 게시글 업로드 페이지 경로 설정
function boardUploadLink() {
    document.location.href = sympathetic_space_upload_page;
}


// 모달 바깥 클릭시 닫기
window.onclick = function(event) {
    if (event.target === video_modal) {
        $(".modal-video").get(0).pause();
        $(".modal-content").fadeOut(300);
        $(".modal-container").fadeOut(300);
    }

    if (event.target === registry_modal) {
        $(".board-modal-container").fadeOut(300);
        $(".board-modal-content").fadeOut(300);
        $(".board-comment-writing-box-item").val("");
        if (showCommentId != null) {
            hideCommentSave(showCommentId);
        }
    }
}

// board 모달 닫기 버튼
function boardClose() {
    $(".board-modal-container").fadeOut(300);
    $(".board-modal-content").fadeOut(300);
    $(".board-comment-writing-box-item").val("");
    if (showCommentId != null){
        hideCommentSave(showCommentId);
    }
}


// 메소드
function getCookie(key) {
    let cookieKey = key +"=";
    let result = "";
    let cookieArr = document.cookie.split(";");

    for (let i=0; i<cookieArr.length; i++){
        if (cookieArr[i][0] === " "){
            cookieArr[i] = cookieArr[i].substring(1);
        }
        if(cookieArr[i].indexOf(cookieKey) === 0) {
            result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
            return result;
        }
    }
    return result;
}

// user 정보 조회
function userInfo() {
    console.log("[userInfo] Get UserInfo");
    $.ajax({
        type: "GET",
        url: host + '/user',
        headers: {"X-AUTH-TOKEN": cookie},
        success: function (response) {
            console.log(response);
            nickname = `${response["nickname"]}`;
            $(".nickname").text(`${response["nickname"]}`);
        }
    })
}

// logout
function logout() {
    $.ajax({
        type: "GET",
        url: host + '/user/logout',
        success: function () {
        }
    })
    window.location.replace(login_page);
    alert("로그아웃 되었습니다.")
}