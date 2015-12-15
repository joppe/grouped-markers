import Backbone from 'backbone';
import google from 'google-maps';
import {Markers} from '../grouped-markers/collection/Markers.js';
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

        this.bounds = new Bounds(this.get('projectionHelper'), this.get('gridSize'));
    }

    /**
     * @param {Marker} marker
     * @returns {boolean}
     */
    contains(marker) {
        return this.bounds.contains(marker.get('latLng'));
    }

    /**
     * @param {Marker} marker
     */
    addMarker(marker) {
        this.get('markers').add(marker);
        this.bounds.extend(marker.get('latLng'));
    }
}