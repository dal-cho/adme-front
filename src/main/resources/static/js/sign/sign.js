$(document).ready(function(){
    $(".signup-id").on('focus keyup', function () { checkHidden() });
    $(".signup-password-confirm").on('focus keyup', function () { checkConfirm() });
});

function signup() {
    let nickname = $(".signup-id").val();
    let password = $(".signup-password").val();
    let name = $(".signup-name").val();
    let email = $(".signup-email").val();

    let form_data = {
        'nickname' : nickname,
        'password' : password,
        'name' : name,
        'email' : email
    }

    $.ajax({
        type: "POST",
        url: host + `/sign-up`,
        data: JSON.stringify(form_data),
        contentType: "application/json; charset=utf-8",
        processData: false,
        success: function (response) {
            alert("회원가입이 완료되었습니다.")
            window.location.replace(login_page);
        }
    });
}

function signin() {
    let nickname = $(".login-id").val();
    let password = $(".login-password").val();

    let data = {'nickname' : nickname, 'password' : password};

    $.ajax({
        type: "POST",
        url: host + `/sign-in`,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        processData: false,
        success: function (response) {
            alert("로그인이 완료되었습니다.")
            document.cookie = "TokenCookie" + "=" + `${response["token"]}`;
            window.location.replace(index_page);
        }
    });
}

function checkHidden() {
    let nickname = $(".signup-id").val();
    if ( nickname === "ADME" ){
        $(".token-label").css("display", "block");
        $(".signup-admin-token").css("display", "block");
        $(".signup-box").css("height", "35.3vw");
    } else {
        $(".token-label").css("display", "none");
        $(".signup-admin-token").css("display", "none");
        $(".signup-box").css("height", "31.5vw");
    }
}

function checkConfirm() {
    let password = $(".signup-password").val();
    let passwordConfirm = $(".signup-password-confirm").val();

    if (password !== passwordConfirm) {
        $(".incorrect-password").css("display","block");
    } else {
        $(".incorrect-password").css("display","none");
    }
}

