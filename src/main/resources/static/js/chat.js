let username = sessionStorage.getItem("nickname");
let socket = new WebSocket("ws://localhost:8080/websocket");

socket.onopen = function(e) {
    console.log('open server!')
    let str = username + " 님이 입장하셨습니다.";
    socket.send(str);
};

socket.onclose = function(e) { // 채팅방에서 나갔을 때
    let str = username + " 님이 방을 나가셨습니다.";
    socket.send(str);
    $("#join-count").load(window.location.href + " #join-span")
}

// 접속자 수 띄우기
$(document).ready(function() {
    count_user();
    loading();
    findSession();
});
let cnt = 0
function loading() { // 채팅 입력 중 띄우기
    $(".content").on("propertychange change keyup paste input", function() {
        cnt++;
        if (cnt == 1) {
            let parentLoading = document.querySelector('.loading');
            let childLoading = document.createElement('div');
            childLoading.className = "child-loading";
            childLoading.innerText = "입력 중....";
            parentLoading.append(childLoading);
        }
    })
}

function gotoBottom() { // 스크롤 바 자동으로 내리기
    $('.msgArea').scrollTop($('.msgArea')[0].scrollHeight);
}

function count_user() {
    $.ajax({
        type: "GET",
        url: `/websocket/count`,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            if (response == 0) {
                response = 1
            }
            $("#num").text(response)
        }
    })
}

socket.onerror = function(e) {
    console.log(e);
}
socket.onmessage = function(e) {
    console.log(e.data);
    let msgArea = document.querySelector('.msgArea');
    let newMsg = document.createElement('div');
    if (e.data.includes(" 님이 입장하셨습니다.") || e.data.includes(" 님이 방을 나가셨습니다.")) {
        newMsg.className = "chatIntro-msg";
        newMsg.innerText = e.data;
    } else { // 채팅 msg
        newMsg.className = "chat-msg";
        newMsg.innerText = e.data;
    }

    msgArea.append(newMsg);

    // 입장 알림 msg
    let introSize = $(".chatIntro-msg").length
    if (introSize > 0) {
        for (let i = 0; i < introSize; i++) {
            if ($(".chatIntro-msg")[i].innerText[0] == "$") {
                newMsg.innerText = $(".chatIntro-msg")[i].innerText.split("$")[1]
            }
        }
    }


    // 채팅 msg
    let size = $(".chat-msg").length
    if (newMsg.className == "chat-msg") {
        if (size > 0) {
            for (let i = 0; i < size; i++) {
                if ($(".chat-msg")[i].innerText[0] == "$") { // 상대
                    newMsg.innerText = $("div.chat-msg")[i].innerText.split("$")[1]
                    newMsg.style = "background: rgba(132, 204, 222, 0.76)";
                } else { // 나
                    newMsg.style = "margin-left: 300px; margin-right: 10px; background : #eee5ca; text-align: end;"
                }
            }
        }
    }
    gotoBottom()
}

function sendMsg() {
    let content = document.querySelector('.content').value;
    socket.send(username + " : " + content); // 닉네임 : message 형태
    $(".content").val('')
    $(".child-loading").remove() // 채팅 입력 완료 되면 입력 중 지우기
    cnt = 0
}

function endChat() {
    let str = username + " 님이 방을 나가셨습니다.";
    socket.send(str);
    $("#join-count").load(window.location.href + " #join-span")
    location.href = "/";
}

function findSession() { // 값이 저장되지 않는 경우 서버에서 session 저장 된 값 가져오기
    if (!sessionStorage.getItem("nickname")) {
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/finduser`,
            contentType: "application/json",
            data: JSON.stringify(),
            success: function(response) {
                sessionStorage.setItem("nickname", response)
                username = sessionStorage.getItem("nickname");
            }
        })
    }
}

setInterval(function() {
    count_user()
}, 500)