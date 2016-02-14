import Backbone from 'backbone';
import {Marker} from './../model/Marker.js';

/**
 * @class Markers
 */
export class Markers extends Backbone.Collection {
    /**
     * @returns {Marker}
     */
    get model() {
        return Marker;
    }
}