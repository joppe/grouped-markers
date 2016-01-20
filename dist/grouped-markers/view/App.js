System.register(['google-maps', 'underscore', 'backbone', './../google/ProjectionHelper.js'], function (_export) {

    /**
     * @class App
     */
    'use strict';

    var google, _, Backbone, ProjectionHelper, App;

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
            App = (function (_Backbone$View) {
                _inherits(App, _Backbone$View);

                /**
                 * @param {Object} options
                 */

                function App(options) {
                    _classCallCheck(this, App);

                    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, options);

                    this.googleMap = new options.MapViewClass({
                        model: this.model,
                        mapOptions: options.mapOptions
                    });

                    this.listenToOnce('change:gmap', this.model, this.createProjectionHelper);
                    this.listenToOnce('change:projectionHelper', this.model, this.addMarkers);
                }

                /**
                 * Create an ProjectionHelper, this is needed to translate pixels to latLng and vice versa.
                 *
                 * @link https://developers.google.com/maps/documentation/javascript/reference?hl=en#MapCanvasProjection
                 */

                _createClass(App, [{
                    key: 'createProjectionHelper',
                    value: function createProjectionHelper() {
                        var _this = this;

                        var projectionHelper = new ProjectionHelper();

                        projectionHelper.onDrawn(function () {
                            _this.model.set({
                                projectionHelper: projectionHelper
                            });
                        });
                        projectionHelper.setMap(map);
                    }
                }, {
                    key: 'addMarkers',
                    value: function addMarkers() {}
                }, {
                    key: 'render',
                    value: function render() {
                        this.googleMap.render();

                        this.model.set('gmap', this.googleMap.gmap);

                        return view;
                    }
                }]);

                return App;
            })(Backbone.View);

            _export('App', App);
        }
    };
});