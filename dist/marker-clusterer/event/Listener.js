System.register(['backbone', 'underscore'], function (_export) {

  /**
   * @class Listener
   */
  'use strict';

  var Backbone, _, Listener;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_backbone) {
      Backbone = _backbone['default'];
    }, function (_underscore) {
      _ = _underscore['default'];
    }],
    execute: function () {
      Listener = function Listener() {
        _classCallCheck(this, Listener);
      };

      _.extend(Listener.prototype, Backbone.Events);

      _export('Listener', Listener);
    }
  };
});