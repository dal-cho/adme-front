$(document).ready(function(){
    navLink();
    userInfo();
});

// 변수
let host = "http://localhost:8080";
let login_page = "http://localhost:63342/front/front.main/static/newdesign/templates/signin.html";
let index_page = "http://localhost:63342/front/front.main/static/newdesign/templates/everyone-record-main-page.html";
let everyone_record_main_page = "http://localhost:63342/front/front.main/static/newdesign/templates/everyone-record-main-page.html";
let everyone_record_upload_page = "http://localhost:63342/front/front.main/static/newdesign/templates/everyone-record-upload-page.html";
let everyone_record_modify_page = "http://localhost:63342/front/front.main/static/newdesign/templates/everyone-record-modify-page.html";
let sympathetic_space_main_page = "http://localhost:63342/front/front.main/static/newdesign/templates/sympathetic-space-main-page.html";
let sympathetic_space_upload_page = "http://localhost:63342/front/front.main/static/newdesign/templates/sympathetic-space-upload-page.html";
let my_record_main_page = "http://localhost:63342/front/front.main/static/newdesign/templates/my-record-main-page.html";

let cookie = getCookie("TokenCookie");

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

function navLink() {
    $("#my_record").attr("href", my_record_main_page);
    $("#everyone_record").attr("href", everyone_record_main_page);
    $("#sympathetic_space").attr("href", sympathetic_space_main_page);
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
            $(".nickname").text(`${response["nickname"]}`);
        }
    })
}

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