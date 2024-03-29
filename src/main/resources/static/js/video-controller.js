// 재생
function playVideo() {
    $(".modal-video").get(0).play();
}
// 재생 중지
function pauseVideo() {
    $(".modal-video").get(0).pause();
}
// 음소거
function mutedVideo() {
    let muteButton = $(".video-mute-button");

    $(".modal-video").get(0).muted = true;
    muteButton.css("border", "1px solid #3b3b3b");
    muteButton.css("background-color", "#858585");
    muteButton.attr("onclick", "soundVideo()");
}
// 소리 재생
function soundVideo() {
    let muteButton = $(".video-mute-button");

    $(".modal-video").get(0).muted = false;
    muteButton.css("background", "");
    muteButton.attr("onclick", "mutedVideo()");
}