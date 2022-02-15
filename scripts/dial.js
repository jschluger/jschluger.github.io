// https://codepen.io/juliajungle/pen/edMxjm


var ball = document.getElementById("ball");
var circle = document.getElementById('circle');
var dragable = false;
var min = 1;
var max = 11;

var getAngle = function (ex, ey, cx, cy) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    console.log('theta', theta);
    var value = Math.round(theta * (max - min) / Math.PI / 2 + min);

    if (theta < 0.0) {
        value = value + max - min;
    }
    console.log('value', value);
    document.getElementById('value').innerHTML = value;
    return theta;
};


function getCoords(cx, cy, r, a) {
    var x = cx + r * Math.cos(a);
    var y = cy + r * Math.sin(a);
    var coords = { x: x, y: y };
    return coords;
}


function mouseDown(e) {
    dragable = true;
}

function mouseMove(e) {

    if (dragable) {
        var posX = e.clientX - circle.offsetLeft;
        var posY = e.clientY - circle.offsetTop;
        var cx = 131;
        var cy = 131;
        var r = 144;

        var angle = getAngle(posX, posY, cx, cy);

        var coords = getCoords(cx, cy, r, angle);

        ball.style.left = coords.x + 'px';
        ball.style.top = coords.y + 'px';

    }

}

function mouseUp(e) {
    console.log('up');
    dragable = false;
}

document.getElementById("main").onmousedown = function (e) { mouseDown(e) };
window.onmouseup = function (e) { mouseUp(e) };
window.onmousemove = function (e) { mouseMove(e) };

