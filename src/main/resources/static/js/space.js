$(document).ready(function(){
    $(".container").fadeIn(1000);
    $(".menu").fadeIn(1000);
    $(".paging_button").fadeIn(1000);
});


// page
$(document).ready(function () {
    $(".dot").hover(function () {
        var cur = $(this);
        var dest = cur.position().left;
        var t = 0.6;
        TweenMax.to($(".select"), t, { x: dest, ease: Back.easeOut });
     });
    var lastPos = $(".select").position().left;
    function updateScale() {
        var pos = $(".select").position().left;

        var speed = Math.abs(pos - lastPos);
        var d = 44;
        var offset = -20;
        var hd = d / 2;
        var scale = (offset + pos) % d;
        if (scale > hd) {
            scale = hd - (scale - hd);
        }
        scale = 1 - (scale / hd) * 0.35;
        TweenMax.to($(".select"), 0.1, { scaleY: scale, scaleX: 1 + speed * 0.06 });

        lastPos = pos;
        requestAnimationFrame(updateScale);
    }
    requestAnimationFrame(updateScale);
    $(".dot:eq(0)").trigger("mouseover");
});

//저장하기 button

$(".btn").on("click", function () {
    let $this = $(this);
    $this.button("loading");
    setTimeout(function () {
        $this.button("reset");
    }, 2000);
});

