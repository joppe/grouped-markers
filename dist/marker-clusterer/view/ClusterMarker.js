System.register(['backbone', './../google/Marker.js'], function (_export) {
    'use strict';

    var Backbone, CustomMarker, ClusterMarker;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_backbone) {
            Backbone = _backbone['default'];
        }, function (_googleMarkerJs) {
            CustomMarker = _googleMarkerJs.Marker;
        }],
        execute: function () {
            ClusterMarker = (function (_Backbone$View) {
                _inherits(ClusterMarker, _Backbone$View);

                _createClass(ClusterMarker, [{
                    key: 'className',

                    /**
                     * @returns {string}
                     */
                    get: function get() {
                        return 'c-marker';
                    }

                    /**
                     * @param {Object} options
                     */
                }]);

                function ClusterMarker(options) {
                    _classCallCheck(this, ClusterMarker);

                    _get(Object.getPrototypeOf(ClusterMarker.prototype), 'constructor', this).call(this, options);

                    this.marker = new CustomMarker(this.model.getCenter(), this.$el);

                    this.listenTo(this.model, 'destroy', this.remove);
                    this.listenTo(this.model, 'change:bounds', this.position);
                    this.listenTo(this.model.get('markers'), 'add', this.update);

                    this.update();
                }

                /**
                 * @param {google.maps.Map} gmap
                 */

                _createClass(ClusterMarker, [{
                    key: 'setMap',
                    value: function setMap(gmap) {
                        this.marker.setMap(gmap);
                    }
                }, {
                    key: 'position',
                    value: function position() {
                        this.marker.setLatLng(this.model.getCenter());
                    }
                }, {
                    key: 'update',
                    value: function update() {
                        var count = this.model.count();

                        if (0 === count) {
                            this.model.trigger('destroy');
                        } else {
                            this.$el.html('<div class="c-marker__count">' + count + '</div>');
                        }
                    }
                }, {
                    key: 'remove',
                    value: function remove() {
                        this.stopListening();
                        this.marker.setMap(null);
                    }
                }]);

                return ClusterMarker;
            })(Backbone.View);

            _export('ClusterMarker', ClusterMarker);
        }
    };
});