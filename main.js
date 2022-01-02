function init() {
    canvas.addEventListener("mousemove", function(event) {
        mouseMoveListener(event);
    }, false);

    canvas.addEventListener('mousedown', function(event) {
        mouseDownListener(event);
    }, false);

    window.addEventListener("keyup", function(event) {
        keyUpListener(event);
    }, false);

    setInterval(function() {
        updateBoard();
    }, 1000 / 32);
}

const pointArray = [];

function AddPoint(x, y) {
    const isCloseFromOtherPoint = pointArray.some(function(point) {
        if (point.checkClose(mousePoint))
            return true;

        return false;
    });

    if (isCloseFromOtherPoint)
        return;

    pointArray.push(new Point(x, y));
}

init();