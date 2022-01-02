let CARDINAL_SPLINE_INSTANCE = null;

class CardinalSpline {
    constructor() {
        if (CARDINAL_SPLINE_INSTANCE) return CARDINAL_SPLINE_INSTANCE;
        CARDINAL_SPLINE_INSTANCE = this;
    }

    draw(ctx) {}
}