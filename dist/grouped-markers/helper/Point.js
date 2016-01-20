System.register([], function (_export) {
  /**
   * @class Point
   */
  "use strict";

  var Point;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      Point = (function () {
        /**
         * @param {Number} x
         * @param {Number} y
         */

        function Point(x, y) {
          _classCallCheck(this, Point);

          this.x = x;
          this.y = y;
        }

        /**
         * @param {Point} point
         * @returns {Point}
         */

        _createClass(Point, [{
          key: "add",
          value: function add(point) {
            var p = this.clone();

            p.x += point.x;
            p.y += point.y;

            return p;
          }

          /**
           * @returns {Point}
           */
        }, {
          key: "clone",
          value: function clone() {
            return new Point(this.x, this.y);
          }

          /**
           * @returns {string}
           */
        }, {
          key: "toString",
          value: function toString() {
            return "{x: " + this.x + ", y: " + this.y + "}";
          }
        }]);

        return Point;
      })();

      _export("Point", Point);
    }
  };
});