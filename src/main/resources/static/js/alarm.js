function start(username, roomId){
    console.log("start sse")
    let id = username + "-" + roomId;
    const eventSource = new EventSource(host + `/room/subscribe/?id=${username}`);

    eventSource.onopen = (e) => {
        console.log("eventSource open")
    };
    eventSource.onerror = (e) => {
        if (e.readyState == EventSource.CLOSED) {
            console.log("eventSource closed")
        }
        eventSource.close();
    };
    eventSource.onmessage = (e) => {
        let message = JSON.parse(e.data + "\n")
        if(message !== "" && message !== null && message !==undefined &&  message.sender === "admin" && roomId === message.roomId){
            alarmForm(message)
        }
    };
}


function alarmForm(data) {
    alarmCount(1);
    if ($(".toast-body").text() === "") {
        let url = host+ `/room/enter/${data.roomId}`
        let roomId = data.roomId
        let toast = `
           <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
      
        <strong class="me-auto">알림  </strong>
        <small class="text-muted">just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" onclick="closeAlarm()"></button>
      </div>
      <div class="toast-body">
        ${data.message}
      </div>
    </div>`
        $("#msgStack").append(toast);

        setTimeout(function() {
            $(".toast").toast('hide'); // Bootstrap의 'hide' 메소드를 호출하여 토스트를 숨김
        }, 3000);
    }
}

function closeAlarm() {
    $('.toast').toast('hide');
}
