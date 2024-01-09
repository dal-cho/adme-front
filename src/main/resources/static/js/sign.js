$(document).ready(function(){
    $(".signup-id").on('focus keyup', function () { checkHidden() });
    $(".signup-password-confirm").on('focus keyup', function () { checkConfirm() });
    $(".signup-password").on('focus keyup', function () { checkRegulation() });
});

let adminCheck = false;
let adminToken = "";

function signup() {
    let nickname = $(".signup-id").val();
    let password = $(".signup-password").val();
    let name = $(".signup-name").val();
    let email = $(".signup-email").val();

    let form_data = {
        'nickname' : nickname,
        'password' : password,
        'name' : name,
        'email' : email,
        'admin' : adminCheck,
        'adminToken' : adminToken
    }

    $.ajax({
        type: "POST",
        url: host + `/sign-up`,
        data: JSON.stringify(form_data),
        contentType: "application/json; charset=utf-8",
        processData: false,
        success: function (response) {
            if(`${response["code"]}` === "0") {
                alert("회원가입이 완료되었습니다.")
                window.location.replace(login_page);
            } else if (`${response["code"]}` === "460") {
                console.log(`${response["code"]}`)
                alert("이메일 및 비밀번호 형식을 확인해주세요.")
            } else if (`${response["code"]}` === "-1") {
                console.log(`${response["code"]}`)
                alert("서버에 오류가 있어 사이트를 이용할 수 없습니다.")
            }
        }
    });
}

function signIn() {
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
            window.localStorage.setItem("token", response["token"])
            window.localStorage.setItem("nickname", response["username"])
            window.location.replace(index_page);
        }
    });
}

function checkHidden() {
    let nickname = $(".signup-id").val();
    let signupAdminToken = $(".signup-admin-token");

    if (nickname === "ADME") {
        $(".token-label").css("display", "block");
        signupAdminToken.css("display", "block");
        $(".signup-box").css("height", "35.3vw");
        adminCheck = true;
        adminToken = signupAdminToken.val()
    } else {
        $(".token-label").css("display", "none");
        $(".signup-admin-token").val("").css("display", "none");
        $(".signup-box").css("height", "31.5vw");
        adminCheck = false;
        adminToken = "";
    }
}

function checkRegulation() {
    let password = $(".signup-password").val();
    const regex = /(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,20}/;
    if(regex.test(password)) {
        $(".password-regulation").css("display","none");
    } else {
        $(".password-regulation").css("display","block");
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