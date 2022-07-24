$(document).ready(function(){
    $(".container").fadeIn(1000);
    $(".menu").fadeIn(1000);
    $(".paging-button").fadeIn(1000);
    $(".upload-button").fadeIn(1000);
    item_click();
    getVideos();
});

//파일 저장
function saveArticle(){
    // 업로드 후 초기화용 변수
    let cloneObj = $(".upload-box").clone();

    // formData = 가상의 <form> 태그라 생각하면 된다.
    let formData = new FormData();
    let inputFile = $("input[name='uploadFile']");
    let files = inputFile[0].files;

    // formData에 값들을 for문으로 입력해서 담아준다.
    for (let i=0; i<files.length; i++){
        // 파일 확장자, 크기에 대한 예외처리
        if(!checkExtension(files[i].name, files[i].size)){
            return false;
        }
        formData.append("uploadFile", files[i]);
    }

    //ajax 를 통해 controller 와 연결
    $.ajax({
        type: "POST",
        url: '/10s/videos',
        data: formData,
        dataType: "json",
        contentType: false,
        async: false,
        processData: false,
        success: function(result) {
            console.log(result);
            // // 업로드 이미지 처리
            // showUploadedFile(result);
            // input 초기화
            $(".upload-box").html(cloneObj.html());
            alert("동작 완료")
        }
    });
}

// 파일 확장자, 크기 처리
function checkExtension(fileName, fileSize){
    let regex = new RegExp("(.*?)\.(exe|sh|zip|alz)$");
    let maxSize = 5242880; //5MB

    if(fileSize >= maxSize){
        alert("파일 사이즈 초과");
        return false;
    }

    if(regex.test(fileName)){
        alert("해당 종류의 파일은 업로드할 수 없습니다.");
        return false;
    }
    return true;
}

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