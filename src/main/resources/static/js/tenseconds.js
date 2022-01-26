$(document).ready(function(){
    $(".container").fadeIn(1000);
    $(".menu").fadeIn(1000);
    $(".paging_button").fadeIn(1000);
});

var modal = document.getElementById("myModal");

var btn = document.getElementsByClassName("item");

function item_click(idx){
    btn[idx].onclick = function (){
        modal.style.display = "block";
    }
}
for(var i=0; i<btn.length; i++){
    item_click(i);
}

var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}