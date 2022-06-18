$(document).ready(function () {
    $(".container").fadeIn(1000);
    $(".s2class").css({"color": "#537ac9"});
    $(".s1class").css({"color": "#748194"});
    $("#left").removeClass("left_hover");
    $("#right").addClass("right_hover");
    $(".signin").css({"display": "none"});
    $(".signup").css({"display": ""});

    $("#username").on('focus keyup', function () {
        checkId()
    })
    $("#nickname").on('focus keyup', function () {
        checkNickname()
    })
    $("#passwordConfirm").on('focus keyup', function () {
        checkPasswordConfirm()
    })

    $("#password").on('focus keyup', function () {
        if ( $("#password").val().length == 0) {
            $("#passwordCheckMsg").text("비밀번호를 입력해주세요")
        } else{
            $("#passwordCheckMsg").text("")
        }
    })
});

$("#right").click(function () {
    $("#left").removeClass("left_hover");
    $(".s2class").css({"color": "#537ac9"});
    $(".s1class").css({"color": "#748194"});
    $("#right").addClass("right_hover");
    $(".signin").css({"display": "none"});
    $(".signup").css({"display": ""});
});

$("#left").click(function () {
    $(".s1class").css({"color": "#537ac9"});
    $(".s2class").css({"color": "#748194"});
    $("#right").removeClass("right_hover");
    $("#left").addClass("left_hover");
    $(".signup").css({"display": "none"});
    $(".signin").css({"display": ""});
});

$(document).ready(function () {
    home()
});

let nicknameType=false
let usernameType=false
let emailType=true
let passwordType=false


function home() {
    findSession()
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/login`,
        contentType: "application/json",
        data: JSON.stringify(),
        success: function (response) {
            console.log("login")
        }
    })
}

function findSession() { // session 저장
    if (sessionStorage.getItem("nickname")) {
        sessionStorage.removeItem("nickname");
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/user/login/nickname`,
            contentType: "application/json",
            data: JSON.stringify(),
            success: function (response) {
                sessionStorage.setItem("nickname", response)
            }
        })
    }
}

function checkId() { // id 중복 확인
    let form_data = new FormData();
    form_data.append("username", $("#username").val())
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/user/signup/username`,
        data: form_data,
        contentType: false,
        processData: false,
        success: function (response) {
            if( response == "사용가능한 ID 입니다.") {
                document.getElementById("usernameMsg").style.color="cornflowerblue";
                $("#usernameMsg").text(response);
                usernameType = true;
            } else {
                document.getElementById("usernameMsg").style.color="red";
                $("#usernameMsg").text(response);
            }

        }
    });
}

function checkNickname() { // 닉네임 중복 확인
    let form_data = new FormData();
    form_data.append("nickname", $("#nickname").val())
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/user/signup/nickname`,
        data: form_data,
        contentType: false,
        processData: false,
        success: function (response) {
            if( response == "사용가능한 닉네임 입니다.") {
                document.getElementById("nicknameMsg").style.color="cornflowerblue";
                $("#nicknameMsg").text(response);
                nicknameType = true
            } else {
                document.getElementById("nicknameMsg").style.color="red";
                $("#nicknameMsg").text(response);
            }
        }
    });
}

function checkPasswordConfirm() { // 비밀번호 확인 체크
    let form_data = new FormData();
    let password = $("#password").val()
    let passwordConfirm = $("#passwordConfirm").val()
    form_data.append("password", password)
    form_data.append("passwordConfirm", passwordConfirm)

    $.ajax({
        type: "POST",
        url: `http://localhost:8080/user/signup/password`,
        data: form_data,
        contentType: false,
        processData: false,
        success: function (response) {
            if( response == "비밀번호가 일치합니다.") {
                document.getElementById("passwordConfirmCheckMsg").style.color="cornflowerblue";
                $("#passwordConfirmCheckMsg").text(response);
                passwordType = true
            } else {
                document.getElementById("passwordConfirmCheckMsg").style.color="red";
                $("#passwordConfirmCheckMsg").text(response);
            }
        }
    });
}


function checkEmail() { // 이메일 체크

}


function checkSignUp(){ // 회원가입 저장 전 체크
    $(".alert-danger").text("")
    if ( (usernameType) && (nicknameType) && (emailType) && (passwordType) ) {
        signUp()
    }
    else{

        if(usernameType == false) {
            $(".alert-danger").text("아이디를 확인해주세요");
        }
        if( nicknameType == false){
            $(".alert-danger").text("닉네임을 확인해주세요");
        }
        if ( emailType == false) {
            $(".alert-danger").text("이메일을 확인해주세요");
        }
        if( passwordType == false){
            $(".alert-danger").text("비밀번호를 확인해주세요");
        }
    }


}
function signUp(){ // 회원가입 db 저장
    let username = $("#username").val();
    let nickname = $("#nickname").val()
    let email = $("#email").val()
    let password = $("#password").val()
    let passwordConfirm = $("#passwordConfirm").val()

    let form_data = new FormData();
    form_data.append("username", username)
    form_data.append("nickname", nickname)
    form_data.append("email", email)
    form_data.append("password", password)
    form_data.append("passwordConfirm", passwordConfirm)
    $(".successMsg").text("");

    $.ajax({
        type: "POST",
        url: `http://localhost:8080/user/signup`,
        data: form_data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response == "회원가입이 완료되었습니다."){
                $(".successMsg").text("회원가입이 완료되었습니다.");

                setTimeout(function (){
                    $(".successMsg").text("로그인 창으로 전환합니다.");
                },1500)

                setTimeout(function (){ // 로그인 창 전환 msg 2초뒤 화면 전환
                    $("#left").click()
                    $(".successMsg").text("")
                }, 3500)
            }

        }
    });
}


function checkSignIn() { // 로그인 체크
    if ( $("#LoginUsername").val().length ==0 ) {
        alert("아이디를 입력해주세요")
    }
    if( $("#LoginPw").val().length == 0 ){
        alert("비밀번호를 입력해주세요")
    }

    if( ($("#LoginUsername").val().length > 0) && ($("#LoginPw").val().length > 0) ) {
        SignIn()
    }

}

function SignIn() { // 로그인 성공 or 실패 메세지
    let form_data = new FormData();
    let username = $("#LoginUsername").val();
    let password = $("#LoginPw").val()
    form_data.append("username", username)
    form_data.append("password", password)

    $(".Login-danger").text("")
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/user/login/input`,
        data: form_data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response == "환영합니다.") {
                $(".LoginSuccessMsg").text(username + "님" + " " + response);
                setTimeout(function () {
                    document.getElementById("signInBtn").setAttribute("type","submit");
                    document.getElementById("signInBtn").click()
                }, 1500)
            } else {
                $(".Login-danger").text(response)

            }
        }
    });
}