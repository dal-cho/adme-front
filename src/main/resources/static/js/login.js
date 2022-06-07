$(document).ready(function(){
    $(".container").fadeIn(1000);
    $(".s2class").css({"color":"#537ac9"});
    $(".s1class").css({"color":"#748194"});
    $("#left").removeClass("left_hover");
    $("#right").addClass("right_hover");
    $(".signin").css({"display":"none"});
    $(".signup").css({"display":""});
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