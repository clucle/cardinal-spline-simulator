const RADIUS = 8;

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static get radius() {
        return RADIUS;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    checkClose(point) {
        const squareLength = (this.x - point.x) * (this.x - point.x) + (this.y - point.y) * (this.y - point.y);
        return Math.sqrt(squareLength) < Point.radius * 2;
    }

    draw(ctx, color) {
        let radisOffset = 0;
        if (color === undefined) {
            color = '#000000';
        } else {
            radisOffset = 1;
        }

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, Point.radius + radisOffset, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}