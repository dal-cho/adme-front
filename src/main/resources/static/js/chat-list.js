
//localStorage.removeItem('wschat.roomId')
function createRoom() {
	if ("" === username) {
		alert("로그아웃 되었습니다.");
		return;
	} else {
		var params = new URLSearchParams();
		params.append("name", username);
		$.ajax({
			type: "POST", url: `/room/`, data: username, contentType: false, processData: false, success: function(response) {
				localStorage.setItem('wschat.roomName', username);
				alert(username + " 님 환영합니다.")
				localStorage.setItem('wschat.roomId', response["roomId"]);
				location.href = "/room/enter/" + response["roomId"];
			}
		});
	}
}

function createNickname() {
	if ("" == $("#createNickname").val()) {
		alert("nickname을 입력해주세요")
		return;
	} else {
		username = $("#createNickname").val();
		localStorage.setItem('wschat.sender', username);
		showList()
		return;
	}
}

function enterRoom(roomId) {
	let roomName = document.getElementsByClassName(roomId)[0].textContent;
	localStorage.setItem('wschat.roomName', roomName);
	if (localStorage.getItem('wschat.sender') == localStorage.getItem('wschat.roomName') || localStorage.getItem('wschat.sender') =="admin") {
		localStorage.setItem('wschat.roomId', roomId);
		location.href = "/room/enter/" + roomId;
	}
}

$(document).ready(function() {
	showList()
	alarmSubscribe();
});

function alarmSubscribe(){
	let roomId = localStorage.getItem('wschat.roomId')
	let username = localStorage.getItem('wschat.sender');
	if (username!= null && roomId != null){
		start(username, roomId);
	}
}

function showList() {
	let username = localStorage.getItem('wschat.sender')
	if (username == "admin") {
		$.ajax({
			type: "GET", url: `/rooms`, contentType: false, processData: false, success: function(response) {
				console.log("채팅방 불러오기 (all) : " + JSON.stringify(response))
				for (let i = 0; i < response.length; i++) {
					let nickname = response[i]["nickname"];
					let roomId = response[i]["roomId"];
					let roomName = nickname + " 님의 채팅방";
					let roomNum = "'" + roomId + "'"
					let tempHtml = `<div class="item"><button class="learn-more" onclick="enterRoom(${roomNum})">${roomName}</button>
                        <div class=${roomId} style="display: none">${nickname}</div>
                   </div>
                   <br>
`
					$(".frame").append(tempHtml);
				}
			}
		})
		return;
	} else if (!username=="") {
		$.ajax({
			type: "GET", url: `/room/one/`+ username, contentType: false, processData: false, success: function(response) {
				console.log("채팅방 불러오기 (one) : " + JSON.stringify(response))
				let nickname = response["nickname"];
				let roomId = response["roomId"];
				let roomName = nickname + " 님의 채팅방";
				let roomNum = "'" + roomId + "'"
				let tempHtml = `<div class="item"> <button class="learn-more" onclick="enterRoom(${roomNum})">${roomName}</button>
               <div class=${roomId} style="display: none">${nickname}</div>
                   </div>
                   <br>
`
				$(".frame").append(tempHtml);
			}, error : function(error){
				let msg = error.responseJSON['message']
				let errorMsg = JSON.stringify(msg)
				$("#errorMsg").text(errorMsg);
			}
		})
		return;
	}
	$('.frame').load(location.href+' .frame');
}
function randomChat(){
	location.href= "/every-chat";
}

function alarmForm(data){
	if ($(".toast-body").text() === "") {
		let url = `/room/enter/${data.roomId}`
		let toast = "<div class='toast' role='alert' aria-live='assertive' aria-atomic='true'>";
		toast += "<div class='toast-header'><i class='fas fa-bell mr-2'></i><strong class='mr-auto'>알림</strong>";
		toast += "<small class='text-muted'>just now</small><button type='button' class='ml-2 mb-1 close' data-dismiss='toast' aria-label='Close'>";
		toast += "<span aria-hidden='true'>&times;</span></button>";
		toast += "</div> <div class='toast-body'>" + data.message + "<br>";
		toast += "<button onclick= " + "closeAlarm()" +"><a href=" + url +"> 바로가기</a></button>" + "</div></div>";
		$("#msgStack").append(toast);
		$(".toast").toast({"animation": true, "autohide": false});
		$('.toast').toast('show');
	}
	if ($('.toast').toast('hide')) {
		$('.toast').toast('show')
	}
	if($(".toast fade hide show")){
		$('.toast').toast('show')
	}
}
function closeAlarm(){
	$('.toast').toast('hide')
}

function adminAlarmForm(data){
	if ($(".toast-body").text().split(" ")[0] !== data.sender){
		let toast = "<div class='toast' role='alert' aria-live='assertive' aria-atomic='true'>";
		toast += "<div class='toast-header'><i class='fas fa-bell mr-2'></i><strong class='mr-auto'>알림</strong>";
		toast += "<small class='text-muted'>just now</small><button type='button' class='ml-2 mb-1 close' data-dismiss='toast' aria-label='Close'>";
		toast += "<span aria-hidden='true'>&times;</span></button>";
		toast += "</div> <div class='toast-body'>" + data.message +"</div></div>";
		$("#msgStack").append(toast);
		$(".toast").toast({"animation": true, "autohide": false});
		$('.toast').toast('show');
	}
	if ($('.toast').toast('hide')) {
		$('.toast').toast('show')
	}
	if($(".toast fade hide show")){
		$('.toast').toast('show')
	}
}