System.register(['google-maps', 'underscore', 'backbone', './../google/ProjectionHelper.js'], function (_export) {

    /**
     * @class AbstractMap
     */
    'use strict';

    var google, _, Backbone, ProjectionHelper, AbstractMap;

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
        }],
        execute: function () {
            AbstractMap = (function (_Backbone$View) {
                _inherits(AbstractMap, _Backbone$View);

                /**
                 * @param {Object} options
                 */

                function AbstractMap(options) {
                    _classCallCheck(this, AbstractMap);

                    _get(Object.getPrototypeOf(AbstractMap.prototype), 'constructor', this).call(this, options);

                    this.mapOptions = options.mapOptions;

                    this.listenToOnce(this.model, 'change:gmap', this.createProjectionHelper);
                    this.listenToOnce(this.model, 'change:projectionHelper', this.ready);
                }

                /**
                 * Create an ProjectionHelper, this is needed to translate pixels to latLng and vice versa.
                 *
                 * @link https://developers.google.com/maps/documentation/javascript/reference?hl=en#MapCanvasProjection
                 */

                _createClass(AbstractMap, [{
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

                    /**
                     * All is initialized and ready to use
                     */
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
                     * This method must be implemented by the class that extends this class.
                     * The method get one argument, the cluster that is added.
                     */
                }, {
                    key: 'addCluster',
                    value: function addCluster() {
                        throw new Error('The addCluster method must be implemented');
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
                    key: 'removeClusters',
                    value: function removeClusters(clusters, previous) {
                        var _this2 = this;

                        _.each(previous.previousModels, function (cluster) {
                            _this2.removeMarker(cluster);
                        });
                    }

                    /**
                     * @returns {AbstractMap}
                     */
                }, {
                    key: 'render',
                    value: function render() {
                        var _this3 = this;

                        var zoomed = false,
                            gmap = new google.maps.Map(this.el, _.extend({}, {
                            zoom: this.model.get('zoom'),
                            center: this.model.get('center')
                        }, this.mapOptions));

                        // The zoom_changed event is fired to fast, the calculation of the latLng to pixels can be done when the bounds are changed.
                        google.maps.event.addListener(gmap, 'zoom_changed', function () {
                            zoomed = true;
                        });

                        google.maps.event.addListener(gmap, 'bounds_changed', function () {
                            if (zoomed) {
                                _this3.model.reindex();
                                zoomed = false;
                            }
                        });

                        // Create the google map instance and store it in the model
                        this.model.set('gmap', gmap);

                        return this;
                    }
                }]);

                return AbstractMap;
            })(Backbone.View);

            _export('AbstractMap', AbstractMap);
        }
    };
});