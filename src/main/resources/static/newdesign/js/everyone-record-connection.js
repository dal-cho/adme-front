$(document).ready(function(){
    getList();
});

// video 전체 조회
function getList() {
    console.log("getList");
    $.ajax({
        type: "GET",
        url: host + '/tenSeconds/list',
        success: function (response) {
            // alert("getList 동작시작");
            console.log(response);
            for (let i=0; i<response.length; i++) {
                videoListPost(response[i], i);
            }
        }
    })
}

// video 단건조회
function videoModal(id) {
    $.ajax({
        type: "GET",
        url: host + '/tenSeconds/video/'+id,
        headers: {"X-AUTH-TOKEN": cookie},
        success: function (response) {
            // alert("getVideo 동작시작");
            console.log(response);
            showModal(response);
        }
    })
}

// 게시글 코드
function videoListPost(article, index) {
    let tempHtml = `<div class="video-item" id="${index}">
                        <div class="video-thumbnail adme-scale-animation" onclick="videoModal(${article["id"]})">
                            <img src="${"files/" + "thumb_" + article["uuid"] +".jpg"}" alt=${"video"+article["id"]+"_thumbnail"}>
                        </div>
                        <div class="video-title" onclick="videoModal(${article["id"]})">
                            <a class="title" href="#">${article["title"]}</a>
                        </div>
                    </div>`;
    $(".video-container").append(tempHtml);
}

// 모달에 들어갈 아이템 설정
function showModal(response) {
    let date = `${response["videoDate"]}`

    $(".modal-title").text(`${response["title"]}`); // 제목
    $(".modal-video").attr("id", `${response["id"]}`); // video id 설정
    $(".modal-video>source").attr("src", `${response["uploadPath"]}`+ `${response["uuid"]}` + ".mp4"); // video 경로
    $(".content-nickname").text(`${response["nickname"]}`); // 게시물 주인 닉네임
    $(".content-date").text(date.split("T")[0].replaceAll("-",".")); // 업로드 날짜
    $(".video-content>textarea").text(`${response["content"]}`); // 게시물 설명

    $(".modal-video").get(0).play();
    $(".modal-content").fadeIn(100);
    $(".modal-container").fadeIn(100);
}