$(document).ready(function(){
    $(".container").fadeIn(1000);
    $(".menu").fadeIn(1000);
    $(".paging_button").fadeIn(1000);
    $(".upload_button").fadeIn(1000);
    item_click();
    getVideos();
});

function item_click(){
    $(".item").click(function (){
        $("#myModal").show();
        // alert("클릭 확인");
        close_click();
        // background_click();
    });
}

function close_click(){
    $(".close").click(function (){
       $("#myModal").hide();
    });
}

var modal = document.getElementById("myModal");

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function getVideos() {
    $.ajax({
        type: "GET",
        url: "/videos",
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                num = response.length - i;
                videoListPost(response[i], num);
                videoInfoPost(response[i], num);
            }
        }
    })
}

function videoListPost(article, index) {
    let tempHtml = `<div class="item" id="${index}">${article["video"]}
                    <a href="#" class="item-title">${article['title']}</a>
                    </div>
                    `;
    $(".item").append(tempHtml);
}

function videoInfoPost(article, index) {
    let tempHtml = `<div>

                    </div>
                    `;
    $(".modal-content").append(tempHtml);
}

function upload() {
    $(".container").hide();
    $(".upload_button").hide();
    $(".upload_container").fadeIn(300);
}