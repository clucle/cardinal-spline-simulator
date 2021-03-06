const canvas = document.getElementById("board");
const tensionSlider = document.getElementById("tension-slider");
const tensionValue = document.getElementById("tension-value");
const ctx = canvas.getContext("2d");
const width = 600;
const height = 600;

let editState = "edit-none";
let mousePoint = new Point(0, 0);
let dragging = true;

function onChangeEditState(state) {
    if (state !== 'edit-add' && state !== 'edit-delete' && state !== 'edit-move' && state !== 'edit-none')
        return;

    editState = state;
}

$('.list-group-item').on('click', function() {
    const $this = $(this);
    $('.active').removeClass('active');
    $this.toggleClass('active');

    onChangeEditState($this.attr('id'));
});

function keyUpListener(event) {
    if (event.defaultPrevented) {
        return;
    }

    const keyMapDict = {
        'a': "edit-add",
        'A': "edit-add",
        'd': "edit-delete",
        'D': "edit-delete",
        'm': "edit-move",
        'M': "edit-move",
        'n': "edit-none",
        'N': "edit-none",
    }

    if (event.key in keyMapDict) {
        const id = '#' + keyMapDict[event.key];
        $(id).click();
    }
}

function mouseMoveListener(event) {
    var canvasBlank = canvas.getBoundingClientRect();
    mousePoint.x = (event.clientX - canvasBlank.left) * (canvas.width / canvasBlank.width);
    mousePoint.y = (event.clientY - canvasBlank.top) * (canvas.height / canvasBlank.height);

    let cursor = '';

    if (editState === 'edit-move') {
        if (dragging) {
            cursor = 'pointer';

            const isCloseFromOtherPoints = pointArray.some(function(point) {
                if (point === draggingPoint)
                    return false;

                if (point.checkClose(mousePoint))
                    return true;

                return false;
            });

            if (dragging && draggingPoint !== undefined && !isCloseFromOtherPoints)
                MovePoint(draggingPoint, mousePoint.x, mousePoint.y);
        } else {
            const isCloseFromPoints = pointArray.some(function(point) {
                if (point.checkClose(mousePoint))
                    return true;

                return false;
            });

            if (isCloseFromPoints)
                cursor = 'pointer';
        }
    }

    canvas.style.cursor = cursor;
}

function mouseUpListener(event) {
    if (editState === 'edit-add') {
        AddPoint(mousePoint.x, mousePoint.y);
    } else if (editState === 'edit-delete') {
        DeletePoint(mousePoint.x, mousePoint.y);
    }

    dragging = false;
    draggingPoint = null;
}

function mouseDownListener(event) {
    dragging = false;
    draggingPoint = null;

    if (editState === 'edit-move') {
        pointArray.some(function(point) {
            if (point.checkClose(mousePoint)) {
                dragging = true;
                draggingPoint = point;
                return true;
            }

            return false;
        });
    }
}

function updateBoard() {
    const backgroundColor = "#ffffff";
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    drawPoint();
    drawCursor();
    drawCardinalSplinePath();
}

function drawPoint() {
    pointArray.forEach(function(point) {
        point.draw(ctx);
    });
}

function drawCursor() {
    if (editState === 'edit-add') {
        const isCloseFromPoints = pointArray.some(function(point) {
            if (point.checkClose(mousePoint))
                return true;

            return false;
        });

        if (isCloseFromPoints)
            return;

        ctx.globalAlpha = 0.8;
        mousePoint.draw(ctx);
        ctx.globalAlpha = 1;
    } else if (editState === 'edit-delete') {
        pointArray.some(function(point) {
            if (point.checkClose(mousePoint)) {
                point.draw(ctx, '#ff2400');
                return true;
            }
            return false;
        });
    }
}

function drawCardinalSplinePath() {
    const cardinalSpline = new CardinalSpline();
    cardinalSpline.draw(ctx);
}