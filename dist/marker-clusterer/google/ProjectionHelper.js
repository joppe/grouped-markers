System.register(['google-maps', './../helper/Point.js'], function (_export) {

    /**
     * @class ProjectionHelper
     */
    'use strict';

    var google, Point, ProjectionHelper;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_googleMaps) {
            google = _googleMaps['default'];
        }, function (_helperPointJs) {
            Point = _helperPointJs.Point;
        }],
        execute: function () {
            ProjectionHelper = (function (_google$maps$OverlayView) {
                _inherits(ProjectionHelper, _google$maps$OverlayView);

                /**
                 * Constructor
                 */

                function ProjectionHelper() {
                    _classCallCheck(this, ProjectionHelper);

                    _get(Object.getPrototypeOf(ProjectionHelper.prototype), 'constructor', this).call(this);

                    this.latLng = new google.maps.LatLng(0, 0);

                    // eslint-disable-next-line no-underscore-dangle
                    this.div_ = document.createElement('div');
                }

                /**
                 * @param {google.maps.LatLng} latLng
                 * @returns {Point}
                 */

                _createClass(ProjectionHelper, [{
                    key: 'fromLatLngToPoint',
                    value: function fromLatLngToPoint(latLng) {
                        var projection = this.getProjection(),
                            pixel = projection.fromLatLngToDivPixel(latLng);

                        return new Point(pixel.x, pixel.y);
                    }

                    /**
                     * @param {Point} point
                     * @returns {google.maps.LatLng}
                     */
                }, {
                    key: 'fromPointToLatLng',
                    value: function fromPointToLatLng(point) {
                        var projection = this.getProjection();

                        return projection.fromDivPixelToLatLng(point);
                    }

                    /**
                     * @param {Function} callback
                     */
                }, {
                    key: 'onDrawn',
                    value: function onDrawn(callback) {
                        this.listener = callback;
                    }

                    /**
                     * Create the html
                     */
                }, {
                    key: 'draw',
                    value: function draw() {
                        // eslint-disable-next-line no-underscore-dangle
                        this.div_.style.left = 0;

                        // eslint-disable-next-line no-underscore-dangle
                        this.div_.style.top = 0;

                        if (undefined !== this.listener) {
                            this.listener.call(null, this.getProjection());
                        }
                    }

                    /**
                     * Executed when the element is added to the DOM
                     */
                }, {
                    key: 'onAdd',
                    value: function onAdd() {
                        var panes = this.getPanes();

                        // eslint-disable-next-line no-underscore-dangle
                        panes.floatPane.appendChild(this.div_);
                    }

                    /**
                     * Executed when the element is removed from the DOM
                     */
                }, {
                    key: 'onRemove',
                    value: function onRemove() {
                        // eslint-disable-next-line no-underscore-dangle
                        this.div_.parentNode.removeChild(this.div_);
                    }
                }]);

                return ProjectionHelper;
            })(google.maps.OverlayView);

            _export('ProjectionHelper', ProjectionHelper);
        }
    };
});