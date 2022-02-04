$(document).ready(function(){
    $(".container").fadeIn(1000);
    $(".menu").fadeIn(1000);
    $(".paging_button").fadeIn(1000);
    showMain();
    //$("#c1-posting").sort()
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


function showMain() {
    $.ajax({
        type: "GET",
        url: `/space`,
        data: {},
        success: function (response) {
            let respon = response.reverse();
            for (let i = 0; i < respon.length; i++) {
                let idx = respon[i]['idx'];
                let title = respon[i]['title'];
                let main = respon[i]['main'];
            /*
            for (let i = 0; i < response.length; i++) {
                let idx = response[i]['idx'];
                let title = response[i]['title'];
                let main = response[i]['main']; */
                if(title.length >= 15) {
                    title = title.substr(0,15) + "...";
                }
                let temp_html = `
                            <li class="item"><div id="${idx}" style="font-size: 20px; text-align: center; margin-top: 60px; padding-left: 5px; padding-right: 5px ">${title}</div></li>
                        `
                $("#c1-posting").append(temp_html);

            }
        }
    });
}

