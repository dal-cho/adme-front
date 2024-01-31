
let messageInput = document.querySelector(".write-message")
let chatArea = document.querySelector('.messages-chat');
let connectingElement = document.querySelector(".messages-chat")
messageInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("sendButton").click();
    }
});
$(document).ready(function () {
    //findToken()
    chatList()
    //setInterval(alarmSubscribe(), 4000)
    $(".messages-chat").text("");
});

function findToken() {
    let urlSearch = new URLSearchParams(location.search);
    token = urlSearch.get('token')
    if (token != null && token !== localStorage.getItem('token')) {
        localStorage.setItem('token', token);
    }
}

var sortJSON = function (data, key, type) {
    if (!Array.isArray(data)) {

        return console.log("sortJSON");
    }

    if (type == undefined) {
        type = "asc";
    }
    return data.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        if (type == "desc") {
            return x > y ? -1 : x < y ? 1 : 0;
        } else if (type == "asc") {
            return x < y ? -1 : x > y ? 1 : 0;
        }
    });
};

function chatList() {
    $.ajax({
        type: "GET",
        url: host + `/rooms`,
        headers: {"Authorization": token},
        contentType: false,
        processData: false,
        success: function (response) {
            console.log("채팅방 불러오기 (all) : " + JSON.stringify(response))
            sortJSON(response, "adminChat", "desc");

            for (let i = 0; i < response.length; i++) {
                let nickname = response[i]["nickname"];
                let roomId = response[i]["roomId"];
                let count = response[i]["adminChat"];
                let message = response[i]["message"];
                let roomNum = "'" + roomId + "'"
                let tempHtml = `
                         <div id=${nickname} class="discussion" onclick="enterRoom(${roomNum})">
        <div class="photo" style="background-color: #82D1E3;">
        </div>
        <div class="desc-contact">
          <p class="name">${nickname}</p>
          <p class="message">${message}</p>
          <div class=${roomId} style="display: none">${nickname}</div>
        </div>
        <div id=${roomId} class="timer">${count}</div>
      </div>
`
                $(".discussions").append(tempHtml);
            }
        }
    })
}

function enterRoom(roomId) {
    $(".messages-chat").text("")
    localStorage.removeItem('wschat.roomId')
    let roomName = document.getElementsByClassName(roomId)[0].textContent;
    $(".chat").css('display', 'block');
    let timer = "#" + roomId
    $(timer).text(0)
    localStorage.setItem('wschat.roomName', roomName);
    localStorage.setItem('wschat.roomId', roomId);
    $(".adme-name").text(roomName);

    let temp_html = `
	<button onclick="joinChat()">yes</button>
	<button onclick="reset()">no</button>
	`
    $(".messages-chat").append(temp_html)
}

function reset() {
    $(".chat").css('display', 'none');
    isRun = false;
    localStorage.removeItem('wschat.roomId')
}

function joinChat() {
    $(".messages-chat").text("")
    let roomName = localStorage.getItem('wschat.roomName')
    isRun = false;
    getFile()
    connect()
}

function leaveChat() {
    $(".chat").css('display', 'none');
    isRun = false;
    localStorage.removeItem('wschat.roomId')
    stompClient.disconnect()
}

function onMessageReceived(payload) { // 메세지 받기
    let roomName = localStorage.getItem('wschat.roomName')
    let message;
    try {
        message = JSON.parse(payload.body);
    } catch (SyntaxError) {
        message = payload;
    }
    let divName = "";
    if (message.sender != "admin") {
        divName = "text"
    } else {
        divName = "response"
    }
    if (message.type === 'JOIN') {
        if (message.sender != "admin") {
            message.message = message.sender + ' 님 안녕하세요';
        }
    } else if (message.type === 'LEAVE' && message.sender != "admin") {
        message.message = message.sender + ' 님이 나가셨습니다.';
    } else if (message.type === 'DELETE') {
        message.message = roomName + ' 님 채팅이 종료되어 ' + '현재 시간 [ ' + ms + ' ]  ' + ' 으로 부터 5분 뒤에 삭제될 예정입니다.';
    } else if (message.type === 'TALK' && message.message != null) {
        let temp = `
         <div class="message text-only">
          <p class="${divName}">${message.message}</p>
        </div>
		`
        $(".messages-chat").append(temp)
        chatArea.scrollTop = chatArea.scrollHeight;
    }
}

function connect() {
    let nickname = "admin";
    if (nickname) {
        let socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({Authorization: token}, onConnected, onError);
    }
}

function onConnected() {
    let roomId = localStorage.getItem('wschat.roomId')
    stompClient.subscribe('/topic/public/' + roomId, onMessageReceived);
    let message = $(".message").last().text().trim();
    stompClient.send("/app/chat/addUser", {Authorization: token}, JSON.stringify({
        roomId: roomId,
        type: 'JOIN',
        message: message
    }))
}

function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}

function sendMessage() {
    alarmMessage()
    let nickname = "admin";
    let roomId = localStorage.getItem('wschat.roomId');
    let messageContent = messageInput.value.trim();
    if (messageContent && stompClient) {
        let chatMessage = {
            roomId: roomId, sender: nickname, message: messageContent, type: 'TALK'
        };
        saveFile(chatMessage)
        stompClient.send("/app/chat/sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
}

function saveFile(chatMessage) {
    let roomId = localStorage.getItem('wschat.roomId');
    let roomName = localStorage.getItem('wschat.roomName')
    $.ajax({
        type: "POST",
        url: host + `/room/enter/` + roomId + '/' + roomName,
        headers: {"Authorization": token},
        data: JSON.stringify(chatMessage),
        contentType: 'application/json',
        processData: false,
        success: function (response) {
        }
    });
}

let isRun = false;

function getFile() {
    let roomId = localStorage.getItem('wschat.roomId');
    let roomName = localStorage.getItem('wschat.roomName')
    $.ajax({
        type: "GET",
        url: host + `/room/enter/` + roomId + '/' + roomName,
        headers: {"Authorization": token},
        contentType: false,
        processData: false,
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                onMessageReceived(response[i])
            }
        }
    })
}