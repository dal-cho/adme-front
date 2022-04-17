$(document).ready(function(){
    $(".container").fadeIn(1000);
    $(".menu").fadeIn(1000);
    $(".paging-button").fadeIn(1000);
    $(".upload-button").fadeIn(1000);
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
                    <a href="#" class="item_title">${article['title']}</a>
                    </div>
                    `;
    $(".item").append(tempHtml);
}

function videoInfoPost(article, index) {
    let tempHtml = `<div>

                    </div>
                    `;
    $(".modal_content").append(tempHtml);
}

function upload() {
    $(".container").hide();
    $(".upload-button").hide();
    $(".paging-button").hide();
    $(".uc1").fadeIn(300);
    $(".upload").show();

    // dropdown
    $("#default-public-button").show();
    $("#default-private-button").hide();
    $("#public-button").hide();
    $("#private-button").hide();
}

// dropdown
function choice_button() {
    $("#default-public-button").hide();
    $("#default-private-button").hide();
    $("#public-button").show();
    $("#private-button").show();
}
function public_check() {
    $("#default-public-button").show();
    $("#default-private-button").hide();
    $("#public-button").hide();
    $("#private-button").hide();
}
function private_check() {
    $("#default-public-button").hide();
    $("#default-private-button").show();
    $("#public-button").hide();
    $("#private-button").hide();
}