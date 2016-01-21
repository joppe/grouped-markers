import Backbone from 'backbone';
import {Markers} from './../collection/Markers.js';
import {Bounds} from './../helper/Bounds.js';

/**
 * @class Cluster
 */
export class Cluster extends Backbone.Model {
    /**
     * @returns {Object}
     */
    get defaults() {
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
    constructor(attributes, options) {
        super(attributes, options);

        this.set({
            bounds: new Bounds(options.projectionHelper, this.get('gridSize'))
        });
    }

    /**
     * @param {Marker} marker
     * @returns {boolean}
     */
    contains(marker) {
        return this.get('bounds').contains(marker.get('latLng'));
    }

    /**
     * @param {Marker} marker
     * @returns {Cluster}
     */
    addMarker(marker) {
        this.get('markers').add(marker);
        this.get('bounds').add(marker.get('latLng'));
        this.trigger('change:bounds');

        return this;
    }

    /**
     * @param {Marker} marker
     * @returns {Cluster}
     */
    removeMarker(marker) {
        this.get('markers').remove(marker);
        this.get('bounds').remove(marker.get('latLng'));
        this.trigger('change:bounds');

        return this;
    }

    /**
     * @returns {number}
     */
    count() {
        return this.get('markers').length;
    }
}