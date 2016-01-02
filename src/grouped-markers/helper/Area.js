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
     * @returns {Number}
     */
    get length() {
        return this.points.length;
    }

    /**
     * @param {Number} size
     */
    constructor(size = 0) {
        this.size = size;
        this.points = [];
        this.center = new Point(0, 0);
    }

    /**
     * Add a point and recalculate the center.
     *
     * @param {Point} point
     * @returns {Area}
     */
    addPoint(point) {
        this.points.push(point);

        this.calculateCenter();

        return this;
    }

    /**
     * Remove a point and recalculate the center.
     *
     * @param {Point} point
     * @returns {Area}
     */
    removePoint(point) {
        let index = this.getIndex(point);

        if (-1 === index) {
            throw `Point not found "${point.toString()}"`;
        }

        this.points.splice(index, 1);

        this.calculateCenter();

        return this;
    }

    /**
     * Get the index of the first found point that matches the x and y of the given point.
     *
     * @param {Point} point
     * @returns {number}
     */
    getIndex(point) {
        let index = -1;

        this.points.every((p, i) => {
            let ret = true;

            if (point.x === p.x && point.y === p.y) {
                ret = false;
                index = i;
            }

            return ret;
        });

        return index;
    }

    calculateCenter() {
        let x = 0,
            y = 0;

        this.points.forEach((point) => {
            x += point.x;
            y += point.y;
        });

        this.center.x = x / this.points.length;
        this.center.y = y / this.points.length;
    }
}