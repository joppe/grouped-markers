import Backbone from 'backbone';
import google from 'google-maps';

/**
 * @class Marker
 */
export class Marker extends Backbone.Model {
    /**
     * @returns {Object}
     */
    get defaults() {
        return {
            latLng: new google.maps.LatLng(0, 0)
        };
    }
}
