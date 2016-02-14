System.register(['google-maps'], function (_export) {
    'use strict';

    var google, Marker;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_googleMaps) {
            google = _googleMaps['default'];
        }],
        execute: function () {
            Marker = (function (_google$maps$OverlayView) {
                _inherits(Marker, _google$maps$OverlayView);

                /**
                 * @param {google.maps.LatLng} latLng
                 * @param {jQuery} $div
                 */

                function Marker(latLng, $div) {
                    _classCallCheck(this, Marker);

                    _get(Object.getPrototypeOf(Marker.prototype), 'constructor', this).call(this);

                    this.latLng = latLng;

                    this.$div = $div;
                    this.div_ = this.$div.get(0);
                }

                /**
                 * @param {google.maps.LatLng} latLng
                 */

                _createClass(Marker, [{
                    key: 'setLatLng',
                    value: function setLatLng(latLng) {
                        this.latLng = latLng;

                        this.draw();
                    }
                }, {
                    key: 'draw',
                    value: function draw() {
                        var projection = this.getProjection(),
                            position = projection.fromLatLngToDivPixel(this.latLng);

                        this.$div.css({
                            left: position.x - this.getWidth() / 2,
                            top: position.y - this.getHeight() / 2
                        });
                    }

                    /**
                     * @returns {number}
                     */
                }, {
                    key: 'getWidth',
                    value: function getWidth() {
                        return this.$div.width();
                    }

                    /**
                     * @returns {number}
                     */
                }, {
                    key: 'getHeight',
                    value: function getHeight() {
                        return this.$div.height();
                    }
                }, {
                    key: 'onAdd',
                    value: function onAdd() {
                        var panes = this.getPanes();

                        panes.floatPane.appendChild(this.div_);
                    }
                }, {
                    key: 'onRemove',
                    value: function onRemove() {
                        this.div_.parentNode.removeChild(this.div_);
                    }
                }]);

                return Marker;
            })(google.maps.OverlayView);

            _export('Marker', Marker);
        }
    };
});