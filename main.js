function init() {
    window.addEventListener("mousemove", function(event) {
        mouseMoveListener(event);
    }, false);

    window.addEventListener("keyup", function(event) {
        keyUpListener(event);
    }, false);

    setInterval(function() {
        updateBoard();
    }, 1000 / 32);
}

init();