$(document).ready(function(){
    $(".nickname").text(nickname);

    linkSetting();
    indexPageInit();
    loadPage();
});

// html 파일 경로값
let host = "http://localhost:8080";
let login_page = "login.html";
let index_page = "everyone-record.html";
let everyone_record_upload_page = "everyone-record-upload.html";
let everyone_record_modify_page = "everyone-record-modify.html";
let everyone_record_main_page = "everyone-record.html";
let registry_main_page = "registry.html";
let registry_upload_page = "registry-upload.html";
let my_record_main_page = "my-record.html";

// localStorage
let token = localStorage.getItem('token');
let nickname = localStorage.getItem('nickname');

// 모달 닫기위한 위치값
let video_modal = document.getElementById("modal");
let registry_modal = document.getElementById("board-Modal");

// 기타 변수
let showCommentId;

// 요일별 index_page 변경
function indexPageInit() {
    let today = new Date();
    let day = today.getDay();  // 요일
    if(day%2 === 0) {
        index_page = "registry.html";
    }
}

// 네비게이션바 및 logo 경로 설정
function linkSetting() {
    $("#my_record").attr("href", my_record_main_page);
    $("#everyone_record").attr("href", everyone_record_main_page);
    $("#empathy_space").attr("href", registry_main_page);
    $(".logo>.logo-link").attr("href", index_page);
}

// 비디오 업로드 및 수정 페이지 경로 설정
function videoUploadLink() {
    document.location.href = everyone_record_upload_page;
}
function modifyLink(id) {
    let choice = confirm("해당 게시글물을 수정 하시겠습니까?");
    window.localStorage.setItem("modifyId",id);
    if (choice) {
        document.location.href = everyone_record_modify_page;
    }
}
// 공감공간 게시글 업로드 페이지 경로 설정
function boardUploadLink() {
    document.location.href = registry_upload_page;
}

// 각 페이지 클릭시 리스트 가져오기
function loadPage() {
    if (window.location.pathname.includes(everyone_record_main_page)) {
        getList(1);
    }else if(window.location.pathname.includes(registry_main_page)) {
        mainRegistry(1);
        sideRegistry();
    }else if(window.location.pathname.includes(my_record_main_page)) {
        getMyList(1);
    }else if(window.location.pathname.includes(everyone_record_modify_page)) {
        let id = localStorage.getItem("modifyId");
        getModifyInfo(id);
    }
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

// logout
function logout() {
    $.ajax({
        type: "GET",
        url: host + '/user/logout',
        success: function () {
            localStorage.clear();
        }
    })
    window.location.replace(login_page);
    alert("로그아웃 되었습니다.")
}