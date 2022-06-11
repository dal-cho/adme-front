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
            } else {
                document.getElementById("passwordConfirmCheckMsg").style.color="red";
                $("#passwordConfirmCheckMsg").text(response);
            }
        }
    });
}