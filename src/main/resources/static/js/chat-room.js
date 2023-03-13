let usernamePage = document.querySelector('#username-page');
let chatPage = document.querySelector('#chat-page');
let usernameForm = document.querySelector('#usernameForm');
let messageForm = document.querySelector('#messageForm');
let messageInput = document.querySelector('#message');
let messageArea = document.querySelector('#messageArea');
let connectingElement = document.querySelector('.connecting');
let endChatRoom = document.querySelector('#endChat');
let stompClient = null;
let username = localStorage.getItem('wschat.sender');
let roomName = localStorage.getItem('wschat.roomName');
let date = new Date();
let ms;
let colors = ['#2196F3', '#32c787', '#00BCD4', '#ff5652', '#ffc107', '#ff85af', '#FF9800', '#39bbb0'];
$(".title").text(roomName + "님 ")
$("#h2-chatRoomName").text(roomName + "님 고객센터 채팅방입니다.")

function connect(event) {
	if (username) {
		usernamePage.classList.add('hidden');
		chatPage.classList.remove('hidden');
		let socket = new SockJS('/ws');
		stompClient = Stomp.over(socket);
		stompClient.connect({}, onConnected, onError);
	}
	event.preventDefault();
}

function onConnected() {
	let roomId = localStorage.getItem('wschat.roomId')
	stompClient.subscribe('/topic/public/' + roomId, onMessageReceived);
	//(Object) subscribe(destination, callback, headers = {})

	stompClient.send("/app/chat/addUser", {}, JSON.stringify({roomId: roomId, sender: username, type: 'JOIN'}))
	//(void) send(destination, headers = {}, body = '')

	connectingElement.classList.add('hidden');
}

function onError(error) {
	connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
	connectingElement.style.color = 'red';
}

// 메세지 보내기
function sendMessage(event) {
	let messageContent = messageInput.value.trim();
	if (messageContent && stompClient) {
		let chatMessage = {
			roomId: roomId, sender: username, message: messageInput.value, type: 'TALK'
		};
		saveFile(chatMessage)
		stompClient.send("/app/chat/sendMessage", {}, JSON.stringify(chatMessage));
		messageInput.value = '';
	}
	event.preventDefault(); // 계속 바뀌는 것을 방지함
}

function saveFile(chatMessage) {
	$.ajax({
		type: "POST",
		url: `/room/enter/` + roomId + '/' + roomName,
		data: JSON.stringify(chatMessage),
		contentType: 'application/json',
		processData: false,
		success: function(response) {
		}
	});
}

let isRun = false;

function getFile() {
	if (isRun == true) {
		return;
	}
	isRun = true;
	$.ajax({
		type: "GET", url: `/room/enter/` + roomId + '/' + roomName, contentType: false, processData: false, success: function(response) {
			for (let i = 0; i < response.length; i++) {
				onMessageReceived(response[i])
			}
		}
	})
}

function onMessageReceived(payload) { // 메세지 받기
	let message;
	try {
		message = JSON.parse(payload.body);
	} catch (SyntaxError) {
		message = payload;
	}
	let messageElement = document.createElement('li');
	if (message.type === 'JOIN') {
		getFile()
		if (message.sender != "admin") {
			messageElement.classList.add('event-message');
			message.message = message.sender + ' 님 안녕하세요';
		}
	} else if (message.type === 'LEAVE' && message.sender != "admin") {
		messageElement.classList.add('event-message');
		message.message = message.sender + ' 님이 나가셨습니다.';
	} else if (message.type === 'DELETE') {
		messageElement.classList.add('event-message');
		message.message = roomName + ' 님 채팅이 종료되어 ' + '현재 시간 [ ' + ms + ' ]  ' + ' 으로 부터 5분 뒤에 삭제될 예정입니다.';
	} else if (message.type === 'TALK' && message.message != null) {
		messageElement.classList.add('chat-message'); // 채팅 메세지
		let avatarElement = document.createElement('i');
		let avatarText = document.createTextNode(message.sender[0]);
		avatarElement.appendChild(avatarText);
		avatarElement.style['background-color'] = getAvatarColor(message.sender);
		messageElement.appendChild(avatarElement);
		let usernameElement = document.createElement('span');
		let usernameText = document.createTextNode(message.sender);
		usernameElement.appendChild(usernameText);
		messageElement.appendChild(usernameElement);
	}
	let textElement = document.createElement('p');
	if (message.message != null) {
		let messageText = document.createTextNode(message.message);
		textElement.appendChild(messageText);
		messageElement.appendChild(textElement);
		messageArea.appendChild(messageElement);
		messageArea.scrollTop = messageArea.scrollHeight;
	}
}

function getAvatarColor(messageSender) {
	let hash = 0;
	for (let i = 0; i < messageSender.length; i++) {
		hash = 31 * hash + messageSender.charCodeAt(i);
	}
	let index = Math.abs(hash % colors.length);
	return colors[index];
}

function deleteRoom() {
	let url = new URL(window.location.href).pathname;
	let roomId = url.split("enter/")[1]
	let delConfrim = confirm("채팅방을 삭제하실 건가요?")
	if (delConfrim) {
		$.ajax({
			type: "DELETE", url: `/room/one/` + roomId, contentType: false, processData: false,
			beforeSend: function(){
				ms = date.getHours() + '시 ' + date.getMinutes() + '분  ' + date.getSeconds();
			},
			success: function(response) {
				saveFile({roomId: roomId, sender: username, type: 'DELETE'})
				alert(roomName + "님 채팅방이 5분뒤에 삭제됩니다.");
				localStorage.removeItem('wschat.roomId')
				localStorage.removeItem('wschat.roomName')
				stompClient.send("/app/chat/end-chat", {}, JSON.stringify({roomId: roomId, sender: username, type: 'DELETE'}))
				setTimeout(function() {
					location.href = "/room/"
				}, 2500);
			}
		})
	} else {
	}
}

if (username == "admin") {
	endChatRoom.classList.remove('hidden');
}

function isRoom(roomId) {
	$.ajax({
		type: "GET", url: `/room/` + roomId, contentType: false, processData: false, success: function(response) {
			if (!response) {
				location.href = "/room/"
			}
		}
	})
}

let url = new URL(window.location.href).pathname;
let roomId = url.split("enter/")[1]
isRoom(roomId)
usernameForm.addEventListener('submit', connect, true)
messageForm.addEventListener('submit', sendMessage, true)

function alarmMessage(){
	document.querySelector('#messageForm').addEventListener("submit", () => {
		fetch(`/room/publish?sender=${username}&roomId=${roomId}`);
	});
}
alarmMessage()