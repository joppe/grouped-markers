System.register(['./Point.js'], function (_export) {

    /**
     * @class Area
     */
    'use strict';

    var Point, Area;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_PointJs) {
            Point = _PointJs.Point;
        }],
        execute: function () {
            Area = (function () {
                _createClass(Area, [{
                    key: 'topRight',

                    /**
                     * @returns {Point}
                     */
                    get: function get() {
                        return this.center.add(new Point(this.size / 2, -this.size / 2));
                    }

                    /**
                     * @returns {Point}
                     */
                }, {
                    key: 'bottomLeft',
                    get: function get() {
                        return this.center.add(new Point(-this.size / 2, this.size / 2));
                    }

                    /**
                     * @returns {Number}
                     */
                }, {
                    key: 'length',
                    get: function get() {
                        return this.points.length;
                    }

                    /**
                     * @param {Number} size
                     */
                }]);

                function Area() {
                    var size = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

                    _classCallCheck(this, Area);

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

                _createClass(Area, [{
                    key: 'add',
                    value: function add(point) {
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
                }, {
                    key: 'remove',
                    value: function remove(point) {
                        var index = this.getIndex(point);

                        if (-1 === index) {
                            throw 'Point not found "' + point.toString() + '"';
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
                }, {
                    key: 'getIndex',
                    value: function getIndex(point) {
                        var index = -1;

                        this.points.every(function (p, i) {
                            var ret = true;

                            if (point.x === p.x && point.y === p.y) {
                                ret = false;
                                index = i;
                            }

                            return ret;
                        });

                        return index;
                    }
                }, {
                    key: 'calculateCenter',
                    value: function calculateCenter() {
                        var x = 0,
                            y = 0;

                        this.points.forEach(function (point) {
                            x += point.x;
                            y += point.y;
                        });

                        this.center.x = x / this.points.length;
                        this.center.y = y / this.points.length;
                    }
                }]);

                return Area;
            })();

            _export('Area', Area);
        }
    };
});