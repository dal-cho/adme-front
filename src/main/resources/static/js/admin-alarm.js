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
        if (message !== "" && message !== null && message !==undefined && message.sender !== "admin" && message.message != null) {
            adminAlarmForm(message)
        }
    };
}

function closeAlarm() {
    $('.toast').toast('hidden')
}

function adminAlarmForm(data) {
    console.log("admin chat alarm : " + data)
    console.log("admin chat alarm : " + data.message)
    let idName = "#"+data.roomId
    let alarmCount = $(idName).text()
    $(".discussions").text("")
    chatList()
    if ($(".toast-body").text().split(" ")[0] !== data.sender) {
        let toast = `
            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-animation="true" data-bs-autohide="true" data-bs-delay="3000">
      <div class="toast-header">
        <img src="..." class="rounded me-2" alt="...">
        <strong class="me-auto">알림  </strong>
        <small class="text-muted">just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${data.message}
      </div>
    </div>`
        $("#msgStack").append(toast);
    }
}

/*
let toast = "<div class='toast' role='alert' aria-live='assertive' aria-atomic='true'>";
    //     toast += "<div class='toast-header'><i class='fas fa-bell mr-2'></i><strong class='mr-auto'>알림  </strong>";
    //     toast += "<small class='text-muted'>just now  </small><button type='button' class='ml-2 mb-1 close' data-dismiss='toast' aria-label='Close'>";
    //     toast += "<span aria-hidden='true'>&times;</span></button>";
    //     toast += "</div> <div class='toast-body'>" + data.message + "</div></div>";
    //        // msgStack div에 생성한 toast 추가
    //     $(".toast").toast({"animation": true, "autohide": false});
    //     $('.toast').toast('show');
    //     setTimeout(closeAlarm, 2500)
    // }
    // if ($('.toast').toast('hide')) {
    //     $('.toast').toast('show')
    //     setTimeout(closeAlarm, 2500)
    // }
    // if ($(".toast fade hide show")) {
    //     $('.toast').toast('show')
    // }
 */