System.register(['backbone', 'google-maps', './../collection/Markers.js', './../collection/Clusters.js', './Cluster.js'], function (_export) {

    /**
     * @class Map
     */
    'use strict';

    var Backbone, google, Markers, Clusters, Cluster, Map;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_backbone) {
            Backbone = _backbone['default'];
        }, function (_googleMaps) {
            google = _googleMaps['default'];
        }, function (_collectionMarkersJs) {
            Markers = _collectionMarkersJs.Markers;
        }, function (_collectionClustersJs) {
            Clusters = _collectionClustersJs.Clusters;
        }, function (_ClusterJs) {
            Cluster = _ClusterJs.Cluster;
        }],
        execute: function () {
            Map = (function (_Backbone$Model) {
                _inherits(Map, _Backbone$Model);

                _createClass(Map, [{
                    key: 'defaults',

                    /**
                     * @returns {Object}
                     */
                    get: function get() {
                        return {
                            gmap: null,
                            projectionHelper: null,
                            markers: new Markers(),
                            clusters: new Clusters()
                        };
                    }

                    /**
                     * @param {Object} attributes
                     * @param {Object} options
                     */
                }]);

                function Map(attributes, options) {
                    _classCallCheck(this, Map);

                    _get(Object.getPrototypeOf(Map.prototype), 'constructor', this).call(this, attributes, options);

                    this.listenTo(this.get('markers'), 'reset', this.resetClusters);
                    this.listenTo(this.get('markers'), 'add', this.addMarkerToCluster);
                    this.listenTo(this.get('markers'), 'remove', this.removeMarkerFromCluster);
                }

                /**
                 * By removing all cluster models we ensure that for each cluster model a "remove" event is fired.
                 */

                _createClass(Map, [{
                    key: 'resetClusters',
                    value: function resetClusters() {
                        this.get('clusters').remove(this.get('clusters').models);
                    }

                    /**
                     * Remove all clusters and create new ones based on the current markers.
                     */
                }, {
                    key: 'reindex',
                    value: function reindex() {
                        var _this = this;

                        this.resetClusters();

                        this.get('markers').each(function (marker) {
                            _this.addMarkerToCluster(marker);
                        });
                    }

                    /**
                     * @param {Array} markers
                     */
                }, {
                    key: 'setMarkers',
                    value: function setMarkers(markers) {
                        this.get('markers').reset(markers);
                    }

                    /**
                     * @param {Marker} marker
                     */
                }, {
                    key: 'addMarkerToCluster',
                    value: function addMarkerToCluster(marker) {
                        var clusters = this.get('clusters'),
                            cluster = clusters.find(function (cluster) {
                            return cluster.contains(marker);
                        });

                        // Create new cluster
                        if (undefined === cluster) {
                            cluster = new Cluster({}, {
                                projectionHelper: this.get('projectionHelper')
                            });
                            cluster.addMarker(marker);

                            clusters.add(cluster);
                        } else {
                            cluster.addMarker(marker);
                        }
                    }

                    /**
                     * @param {Marker} marker
                     */
                }, {
                    key: 'removeMarkerFromCluster',
                    value: function removeMarkerFromCluster(marker) {
                        var cluster = this.get('clusters').find(function (cluster) {
                            return cluster.get('markers').contains(marker);
                        });

                        if (undefined === cluster) {
                            throw 'Marker not found on any cluster (Map.removeMarkerFromCluster())';
                        }

                        cluster.removeMarker(marker);
                    }
                }]);

                return Map;
            })(Backbone.Model);

            _export('Map', Map);
        }
    };
});