function start(username, roomId){
    const eventSource = new EventSource(host + `/alarm/subscribe/?id=${username}`);

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
    $("#msgStack").hide()
}

function adminAlarmForm(data) {
    let idName = "#"+data.roomId
    let alarmCount = $(idName).text()
    $(".discussions").text("")
    chatList()
    if ($(".toast-body").text().split(" ")[0] !== data.sender) {


let toast = "<div class='toast' role='alert' aria-live='assertive' aria-atomic='true'>";
         toast += "<div class='toast-header'><i class='fas fa-bell mr-2'></i><strong class='mr-auto'>알림  </strong>";
         toast += "<small class='text-muted'>just now  </small><button type='button' onclick='closeAlarm()' class='ml-2 mb-1 close' data-dismiss='toast' aria-label='Close'>";
         toast += "<span aria-hidden='true'>&times;</span></button>";
         toast += "</div> <div class='toast-body'>" + data.message + "</div></div>";


        if($("#msgStack").css("display") === "none"){
            console.log(" = = = = display : none = = = = ")
            $("#msgStack").show();
            setTimeout(function() {
                $("#msgStack").hide()
            }, 2000);
        }else{
            $("#msgStack").append(toast);
            setTimeout(function() {
                $("#msgStack").hide()
            }, 2000);
        }

    }
}