/**
 * @class Point
 */
export class Point {
    /**
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * @param {Point} point
     * @returns {Point}
     */
    add(point) {
        let p = this.clone();

        p.x += point.x;
        p.y += point.y;

        return p;
    }

    /**
     * @returns {Point}
     */
    clone() {
        return new Point(this.x, this.y);
    }
}