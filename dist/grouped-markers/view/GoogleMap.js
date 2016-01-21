System.register(['google-maps', 'underscore', 'backbone', './../google/ProjectionHelper.js', './Marker.js'], function (_export) {

    /**
     * @class GoogleMap
     */
    'use strict';

    var google, _, Backbone, ProjectionHelper, Marker, GoogleMap;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_googleMaps) {
            google = _googleMaps['default'];
        }, function (_underscore) {
            _ = _underscore['default'];
        }, function (_backbone) {
            Backbone = _backbone['default'];
        }, function (_googleProjectionHelperJs) {
            ProjectionHelper = _googleProjectionHelperJs.ProjectionHelper;
        }, function (_MarkerJs) {
            Marker = _MarkerJs.Marker;
        }],
        execute: function () {
            GoogleMap = (function (_Backbone$View) {
                _inherits(GoogleMap, _Backbone$View);

                _createClass(GoogleMap, [{
                    key: 'className',

                    /**
                     * @returns {string}
                     */
                    get: function get() {
                        return 'c-google-maps';
                    }

                    /**
                     * @param {Object} options
                     */
                }]);

                function GoogleMap(options) {
                    _classCallCheck(this, GoogleMap);

                    _get(Object.getPrototypeOf(GoogleMap.prototype), 'constructor', this).call(this, options);

                    this.mapOptions = options.mapOptions;

                    this.listenToOnce(this.model, 'change:gmap', this.createProjectionHelper);
                    this.listenToOnce(this.model, 'change:projectionHelper', this.ready);
                }

                /**
                 * Create an ProjectionHelper, this is needed to translate pixels to latLng and vice versa.
                 *
                 * @link https://developers.google.com/maps/documentation/javascript/reference?hl=en#MapCanvasProjection
                 */

                _createClass(GoogleMap, [{
                    key: 'createProjectionHelper',
                    value: function createProjectionHelper() {
                        var _this = this;

                        var projectionHelper = new ProjectionHelper();

                        projectionHelper.onDrawn(function () {
                            _this.model.set({
                                projectionHelper: projectionHelper
                            });
                        });
                        projectionHelper.setMap(this.model.get('gmap'));
                    }
                }, {
                    key: 'ready',
                    value: function ready() {
                        var clusters = this.model.get('clusters');

                        this.listenTo(clusters, 'add', this.addCluster);
                        this.listenTo(clusters, 'remove', this.removeCluster);
                        this.listenTo(clusters, 'reset', this.removeClusters);

                        this.model.reindex();
                    }

                    /**
                     * @param {Cluster} cluster
                     */
                }, {
                    key: 'addCluster',
                    value: function addCluster(cluster) {
                        var marker = new Marker({
                            model: cluster
                        });

                        marker.setMap(this.model.get('gmap'));
                    }

                    /**
                     * @param {Cluster} cluster
                     */
                }, {
                    key: 'removeCluster',
                    value: function removeCluster(cluster) {
                        cluster.trigger('destroy');
                    }

                    /**
                     * @param {Clusters} clusters
                     * @param {Array} previous
                     */
                }, {
                    key: 'removeMarkers',
                    value: function removeMarkers(clusters, previous) {
                        var _this2 = this;

                        _.each(previous.previousModels, function (cluster) {
                            _this2.removeMarker(cluster);
                        });
                    }

                    /**
                     * @returns {GoogleMap}
                     */
                }, {
                    key: 'render',
                    value: function render() {
                        // Create the google map instance and store it in the model
                        this.model.set('gmap', new google.maps.Map(this.el, _.extend({}, {
                            zoom: this.model.get('zoom'),
                            center: this.model.get('center')
                        }, this.mapOptions)));

                        return this;
                    }
                }]);

                return GoogleMap;
            })(Backbone.View);

            _export('GoogleMap', GoogleMap);
        }
    };
});