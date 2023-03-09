function start(username, roomId){
	console.log("username + roomId : "+ username + roomId)
	let id = username + "-" + roomId;
	const eventSource = new EventSource(`/room/subscribe/?id=${username}`);

	eventSource.onopen = (e) => {
	};
	eventSource.onerror = (e) => {
		if (e.readyState == EventSource.CLOSED) {
			// Connection was closed.
		}
	};
	eventSource.onmessage = (e) => {
		let message = JSON.parse(e.data + "\n")
		if (message !== "" && message !== null && message !==undefined && message.sender !== "admin") {
			adminAlarmForm(message)
		}
		else if(message !== "" && message !== null && message !==undefined &&  message.sender === "admin" && roomId === message.roomId){
			alarmForm(message)
		}
	};
}
