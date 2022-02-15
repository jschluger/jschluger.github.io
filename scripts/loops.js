var which = 1;
var playing = false;

function stop_start() {
    if (playing) {
        console.log('Turning off loop #' + which);
    }

    else {
        which = $('#dial-value').value();
        console.log('Turning on loop #' + which);
    }
    playing = !playing;
}

$('#loop-stop-start').click(stop_start);
