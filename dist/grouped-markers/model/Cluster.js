System.register(['backbone', './../collection/Markers.js', './../helper/Bounds.js'], function (_export) {

    /**
     * @class Cluster
     */
    'use strict';

    var Backbone, Markers, Bounds, Cluster;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_backbone) {
            Backbone = _backbone['default'];
        }, function (_collectionMarkersJs) {
            Markers = _collectionMarkersJs.Markers;
        }, function (_helperBoundsJs) {
            Bounds = _helperBoundsJs.Bounds;
        }],
        execute: function () {
            Cluster = (function (_Backbone$Model) {
                _inherits(Cluster, _Backbone$Model);

                _createClass(Cluster, [{
                    key: 'defaults',

                    /**
                     * @returns {Object}
                     */
                    get: function get() {
                        return {
                            bounds: null,
                            markers: new Markers(),
                            gridSize: 100
                        };
                    }

                    /**
                     * @param {Object} attributes
                     * @param {Object} options
                     */
                }]);

                function Cluster(attributes, options) {
                    _classCallCheck(this, Cluster);

                    _get(Object.getPrototypeOf(Cluster.prototype), 'constructor', this).call(this, attributes, options);

                    this.set({
                        bounds: new Bounds(options.projectionHelper, this.get('gridSize'))
                    });
                }

                /**
                 * @param {Marker} marker
                 * @returns {boolean}
                 */

                _createClass(Cluster, [{
                    key: 'contains',
                    value: function contains(marker) {
                        return this.get('bounds').contains(marker.get('latLng'));
                    }

                    /**
                     * @param {Marker} marker
                     * @returns {Cluster}
                     */
                }, {
                    key: 'addMarker',
                    value: function addMarker(marker) {
                        this.get('markers').add(marker);
                        this.get('bounds').add(marker.get('latLng'));
                        this.trigger('change:bounds');

                        return this;
                    }

                    /**
                     * @param {Marker} marker
                     * @returns {Cluster}
                     */
                }, {
                    key: 'removeMarker',
                    value: function removeMarker(marker) {
                        this.get('markers').remove(marker);
                        this.get('bounds').remove(marker.get('latLng'));
                        this.trigger('change:bounds');

                        return this;
                    }

                    /**
                     * @returns {number}
                     */
                }, {
                    key: 'count',
                    value: function count() {
                        return this.get('markers').length;
                    }

                    /**
                     * @returns {google.maps.LatLng}
                     */
                }, {
                    key: 'getCenter',
                    value: function getCenter() {
                        return this.get('bounds').getCenter();
                    }
                }]);

                return Cluster;
            })(Backbone.Model);

            _export('Cluster', Cluster);
        }
    };
});