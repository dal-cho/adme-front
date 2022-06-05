let username = sessionStorage.getItem("nickname");
let socket = new WebSocket("ws://localhost:8080/websocket");

socket.onopen = function (e) {
    console.log('open server!')
    let str = username + " 님이 입장하셨습니다.";
    socket.send(str);
    count_user()
};

socket.onclose = function (e) { // 채팅방에서 나갔을 때
    let str = username + " 님이 방을 나가셨습니다.";
    socket.send(str);
    $("#join-count").load(window.location.href + " #join-span")
}

// 접속자 수 띄우기
$(document).ready(function(){
    count_user()
});

function gotoBottom(){
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


socket.onerror = function (e) {
    console.log(e);
}

socket.onmessage = function (e) {
    console.log(e.data);
    let msgArea = document.querySelector('.msgArea');
    let newMsg = document.createElement('div');

    if (e.data.includes(" 님이 입장하셨습니다.")) {
        newMsg.className = "chatIntro-msg";
        newMsg.innerText = e.data;
    } else { // 채팅 msg
        newMsg.className = "chat-msg";
        newMsg.innerText = e.data;
    }

    msgArea.append(newMsg);

    // 입장 알림 msg
    let introSize = $(".chatIntro-msg").length
    if (introSize>0) {
        for (let i = 0; i<introSize; i++) {
            if (  $(".chatIntro-msg")[i].innerText[0] == "$") {
                newMsg.innerText = $(".chatIntro-msg")[i].innerText.split("$")[1]
            }
        }
    }

    // 채팅 msg
    let size = $(".chat-msg").length
    if(newMsg.className == "chat-msg") {
        if (size>0) {
            for (let i = 0; i<size; i++) {
                if (  $(".chat-msg")[i].innerText[0] == "$") { // 상대
                    newMsg.innerText = $("div.chat-msg")[i].innerText.split("$")[1]
                    newMsg.style = "background: rgba(132, 204, 222, 0.76)";
                } else { // 나
                    newMsg.style = "margin-left: 300px; margin-right: 10px; background : #eee5ca;"
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
    count_user();
}

function endChat() {
    let str = username + " 님이 방을 나가셨습니다.";
    socket.send(str);
    $("#join-count").load(window.location.href + " #join-span")
    count_user()
    location.href = "/";
}
