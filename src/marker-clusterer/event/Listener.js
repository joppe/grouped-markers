import Backbone from 'backbone';
import _ from 'underscore';

/**
 * @class Listener
 */
class Listener {}

_.extend(Listener.prototype, Backbone.Events);

export {Listener};
