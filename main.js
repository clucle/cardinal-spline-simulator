const c = document.getElementById("board");
const ctx = c.getContext("2d");
const width = 600;
const height = 600;

function updateBoard() {
    const backgroundColor = "#ffffff";
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
}

function init() {
    updateBoard();
}

init();