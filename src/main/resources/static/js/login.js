$(document).ready(function(){
    $(".container").fadeIn(1000);
    $(".s2class").css({"color":"#537ac9"});
    $(".s1class").css({"color":"#748194"});
    $("#left").removeClass("left_hover");
    $("#right").addClass("right_hover");
    $(".signin").css({"display":"none"});
    $(".signup").css({"display":""});

    $("#username").on('focus keyup', function () {
        checkId()
    })
    $("#nickname").on('focus keyup', function () {
        checkNickname()
    })

});

$("#right").click(function(){
    $("#left").removeClass("left_hover");
    $(".s2class").css({"color":"#537ac9"});
    $(".s1class").css({"color":"#748194"});
    $("#right").addClass("right_hover");
    $(".signin").css({"display":"none"});
    $(".signup").css({"display":""});
});

$("#left").click(function(){
    $(".s1class").css({"color":"#537ac9"});
    $(".s2class").css({"color":"#748194"});
    $("#right").removeClass("right_hover");
    $("#left").addClass("left_hover");
    $(".signup").css({"display":"none"});
    $(".signin").css({"display":""});
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
    }
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

function checkId() { // id 중복 확인
    let form_data = new FormData();
    form_data.append("username", $("#username").val())
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/user/signup`,
        data: form_data,
        contentType: false,
        processData: false,
        success: function (response) {
            $("#usernameMsg").text(response);
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
            $("#nicknameMsg").text(response);
        }
    });
}