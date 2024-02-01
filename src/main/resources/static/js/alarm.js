function start(username, roomId){
    let id = username + "-" + roomId;
    const eventSource = new EventSource(`/room/subscribe/?id=${username}`);

    eventSource.onopen = (e) => {
    };
    eventSource.onerror = (e) => {
        if (e.readyState == EventSource.CLOSED) {
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
        let url = `/room/enter/${data.roomId}`
        let roomId = data.roomId
        let toast = "<div class='toast' role='alert' aria-live='assertive' aria-atomic='true'>";
        toast += "<div class='toast-header'><i class='fas fa-bell mr-2'></i><strong class='mr-auto'>알림</strong>";
        toast += "<small class='text-muted'>just now</small><button type='button' onclick='closeAlarm()' class='ml-2 mb-1 close' data-dismiss='toast' aria-label='Close'>";
        toast += "<span aria-hidden='true'>&times;</span></button>";
        toast += "</div> <div class='toast-body'>" + data.message + "</div></div>";
        $("#msgStack").append(toast);
        $(".toast").toast({"animation": true, "autohide": false});
        $('.toast').toast('show');
    }
    if ($('.toast').toast('hide')) {
        $('.toast').toast('show')
        setTimeout(closeAlarm, 2500)
    }
    if ($(".toast fade hide show")) {
        $('.toast').toast('show')
    }
}

function closeAlarm() {
    $('.toast').toast('hide')
}
