System.register(['google-maps', './Area.js'], function (_export) {

    /**
     * @class Bounds
     */
    'use strict';

    var google, Area, Bounds;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_googleMaps) {
            google = _googleMaps['default'];
        }, function (_AreaJs) {
            Area = _AreaJs.Area;
        }],
        execute: function () {
            Bounds = (function () {
                /**
                 * @param {ProjectionHelper} projectionHelper
                 * @param {Number} gridSize
                 */

                function Bounds(projectionHelper, gridSize) {
                    _classCallCheck(this, Bounds);

                    this.projectionHelper = projectionHelper;

                    this.area = new Area(gridSize);
                    this.bounds = new google.maps.LatLngBounds();
                }

                /**
                 * @param {google.maps.LatLng} latLng
                 * @returns {boolean}
                 */

                _createClass(Bounds, [{
                    key: 'contains',
                    value: function contains(latLng) {
                        return this.bounds.contains(latLng);
                    }

                    /**
                     * @param {google.maps.LatLng} latLng
                     * @returns {Bounds}
                     */
                }, {
                    key: 'add',
                    value: function add(latLng) {
                        this.area.add(this.projectionHelper.fromLatLngToPoint(latLng));

                        this.updateBounds();

                        return this;
                    }

                    /**
                     * @param {google.maps.LatLng} latLng
                     * @returns {Bounds}
                     */
                }, {
                    key: 'remove',
                    value: function remove(latLng) {
                        this.area.remove(this.projectionHelper.fromLatLngToPoint(latLng));

                        this.updateBounds();

                        return this;
                    }
                }, {
                    key: 'updateBounds',
                    value: function updateBounds() {
                        this.bounds = new google.maps.LatLngBounds(this.projectionHelper.fromPointToLatLng(this.area.bottomLeft), this.projectionHelper.fromPointToLatLng(this.area.topRight));
                    }

                    /**
                     * @returns {google.maps.LatLng}
                     */
                }, {
                    key: 'getCenter',
                    value: function getCenter() {
                        return this.bounds.getCenter();
                    }
                }]);

                return Bounds;
            })();

            _export('Bounds', Bounds);
        }
    };
});