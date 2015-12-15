import {Point} from './Point.js';

/**
 * @class Area
 */
export class Area {
    /**
     * @returns {Point}
     */
    get topRight() {
        return this.center.add(new Point(this.size, -this.size));
    }

    /**
     * @returns {Point}
     */
    get bottomLeft() {
        return this.center.add(new Point(-this.size, this.size));
    }

    /**
     * @param {Number} size
     */
    constructor(size) {
        this.size = size;
        this.count = 0;
        this.center = new Point(0, 0);
    }

    /**
     * Add a point by recalculating the average position and set it as the center.
     *
     * @param {Point} point
     * @returns {Area}
     */
    addPoint(point) {
        let x = this.center.x,
            y = this.center.y;

        this.count += 1;

        x *= this.count - 1;
        y *= this.count - 1;

        x += point.x;
        y += point.y;

        x /= count;
        y /= count;

        this.center.x = x;
        this.center.y = y;

        return this;
    }
}