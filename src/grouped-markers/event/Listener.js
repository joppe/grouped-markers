import Backbone from 'backbone';

/**
 * @class Listener
 */
class Listener {}

_.extend(Listener.prototype, Backbone.Events);

export { Listener }