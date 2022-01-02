const RADIUS = 8;

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static get radius() {
        return RADIUS;
    }

    checkClose(point) {
        const squareLength = (this.x - point.x) * (this.x - point.x) + (this.y - point.y) * (this.y - point.y);
        return Math.sqrt(squareLength) < Point.radius * 2;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#000000";
        ctx.arc(this.x, this.y, Point.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}