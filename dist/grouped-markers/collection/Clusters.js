System.register(['backbone', './../model/Cluster.js'], function (_export) {

  /**
   * @class Clusters
   */
  'use strict';

  var Backbone, Cluster, Clusters;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_backbone) {
      Backbone = _backbone['default'];
    }, function (_modelClusterJs) {
      Cluster = _modelClusterJs.Cluster;
    }],
    execute: function () {
      Clusters = (function (_Backbone$Collection) {
        _inherits(Clusters, _Backbone$Collection);

        function Clusters() {
          _classCallCheck(this, Clusters);

          _get(Object.getPrototypeOf(Clusters.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(Clusters, [{
          key: 'model',

          /**
           * @returns {Cluster}
           */
          get: function get() {
            return Cluster;
          }
        }]);

        return Clusters;
      })(Backbone.Collection);

      _export('Clusters', Clusters);
    }
  };
});