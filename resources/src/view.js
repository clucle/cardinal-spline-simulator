const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const width = 600;
const height = 600;

let editState = "edit-none";
let mouseX = 0;
let mouseY = 0;

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
    mouseX = (event.clientX - canvasBlank.left) * (canvas.width / canvasBlank.width);
    mouseY = (event.clientY - canvasBlank.top) * (canvas.height / canvasBlank.height);
}

function updateBoard() {
    const backgroundColor = "#ffffff";
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    drawCursor();
}

function drawCursor() {
    if (editState === 'edit-add') {
        const radius = 12;

        ctx.beginPath();
        ctx.globalAlpha = 0.8;

        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#000000";

        ctx.arc(mouseX, +mouseY, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
}