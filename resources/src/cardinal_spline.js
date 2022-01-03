let CARDINAL_SPLINE_INSTANCE = null;
const TIME_EXPAND_COUNT = 100;
const TENSION = 0.5;
const h00 = [];
const h10 = [];
const h01 = [];
const h11 = [];

class CardinalSpline {
    constructor() {
        if (CARDINAL_SPLINE_INSTANCE) return CARDINAL_SPLINE_INSTANCE;

        this.pointArray = [];
        this.updated = false;
        this.tension = 0.5;

        for (let idx = 0; idx <= TIME_EXPAND_COUNT; idx++) {
            const t = idx / TIME_EXPAND_COUNT;
            h00[idx] = 2 * Math.pow(t, 3) - 3 * Math.pow(t, 2) + 1;
            h10[idx] = Math.pow(t, 3) - 2 * Math.pow(t, 2) + t;
            h01[idx] = -2 * Math.pow(t, 3) + 3 * Math.pow(t, 2);
            h11[idx] = Math.pow(t, 3) - Math.pow(t, 2);
        }

        CARDINAL_SPLINE_INSTANCE = this;
    }

    setTension(tension) {
        tension *= 1;
        if (typeof tension !== 'number') {
            return;
        }

        if (tension < 0)
            tension = 0;

        if (tension > 1)
            tension = 1;

        this.tension = tension;
        this.updated = false;
    }

    updatePointArray(pointArray) {
        this.pointArray = pointArray;
        this.updated = false;
    }

    updateTangentPointArray() {
        this.tangentPointArray = [];
        if (this.pointArray.length < 2)
            return;

        for (let k = 0; k < this.pointArray.length; ++k) {
            let xDiff = 0;
            let yDiff = 0;
            if (k == 0) {
                xDiff = this.pointArray[1].x - this.pointArray[0].x;
                yDiff = this.pointArray[1].y - this.pointArray[0].y;
            } else if (k == this.pointArray.length - 1) {
                xDiff = this.pointArray[k].x - this.pointArray[k - 1].x;
                yDiff = this.pointArray[k].y - this.pointArray[k - 1].y;
            } else {
                xDiff = this.pointArray[k + 1].x - this.pointArray[k - 1].x;
                yDiff = this.pointArray[k + 1].y - this.pointArray[k - 1].y;
            }
            this.tangentPointArray.push(new Point(xDiff, (1 - this.tension) * yDiff));
        }
    }

    updateDrawPointArray() {
        if (this.pointArray.length < 2)
            return;

        this.drawPointArray = [];

        for (let k = 0; k < this.pointArray.length - 1; ++k) {
            const pk = this.pointArray[k];
            const mk = this.tangentPointArray[k];
            const pk_1 = this.pointArray[k + 1];
            const mk_1 = this.tangentPointArray[k + 1];

            let prevPoint = this.pointArray[k];
            this.drawPointArray.push(prevPoint);

            for (let idx = 1; idx <= TIME_EXPAND_COUNT; idx++) {
                const t = idx / TIME_EXPAND_COUNT;
                const x = h00[idx] * pk.x + h10[idx] * mk.x + h01[idx] * pk_1.x + h11[idx] * mk_1.x;
                const y = h00[idx] * pk.y + h10[idx] * mk.y + h01[idx] * pk_1.y + h11[idx] * mk_1.y;

                let curPoint = new Point(x, y);

                ctx.beginPath();
                ctx.moveTo(prevPoint.x, prevPoint.y);
                ctx.lineTo(curPoint.x, curPoint.y);
                ctx.stroke();

                prevPoint = curPoint;
                this.drawPointArray.push(curPoint);
            }
        }
    }

    draw(ctx) {
        if (this.pointArray.length < 2)
            return;

        if (this.updated === false) {
            this.updateTangentPointArray();
            this.updateDrawPointArray();

            this.updated = true;
        }

        for (let idx = 0; idx < this.drawPointArray.length - 1; ++idx) {
            ctx.beginPath();
            ctx.moveTo(this.drawPointArray[idx].x, this.drawPointArray[idx].y);
            ctx.lineTo(this.drawPointArray[idx + 1].x, this.drawPointArray[idx + 1].y);
            ctx.stroke();
        }
    }
}