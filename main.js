function init() {
    canvas.addEventListener("mousemove", function(event) {
        mouseMoveListener(event);
    }, false);

    canvas.addEventListener('mouseup', function(event) {
        mouseUpListener(event);
    }, false);

    canvas.addEventListener('mousedown', function(event) {
        mouseDownListener(event);
    }, false);

    window.addEventListener("keyup", function(event) {
        keyUpListener(event);
    }, false);

    tensionSlider.oninput = function() {
        let cardinalSpline = new CardinalSpline();
        cardinalSpline.setTension(this.value);

        tensionValue.innerHTML = this.value;
    }

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

    let cardinalSpline = new CardinalSpline()
    cardinalSpline.updatePointArray(pointArray);
}

function DeletePoint(x, y) {
    pointArray.some(function(point, idx) {
        if (point.checkClose(mousePoint)) {
            pointArray.splice(idx, 1);

            let cardinalSpline = new CardinalSpline()
            cardinalSpline.updatePointArray(pointArray);

            return true;
        }

        return false;
    });
}

function MovePoint(point, x, y) {
    point.set(x, y);

    let cardinalSpline = new CardinalSpline()
    cardinalSpline.updatePointArray(pointArray);
}

init();