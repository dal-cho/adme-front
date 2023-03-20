$(document).ready(function(){
});

// board 모달 열기
function boardModal() {
    $(".board-modal-container").fadeIn(100);
    $(".board-modal-content").fadeIn(100);
}
// board 모달 닫기
function boardClose() {
    $(".board-modal-container").fadeOut(300);
    $(".board-modal-content").fadeOut(300);
    $(".board-comment-writing-box-item").val(''); // 댓글 박스 클리어
}

function boardSave() {
    if(confirm("댓글을 등록하시겠습니까?")){

        $(".board-comment-writing-box-item").val(''); // 댓글 박스 클리어
    }
}
