import google from 'google-maps';
import {Point} from './../helper/Point.js';

/**
 * @class ProjectionHelper
 */
export class ProjectionHelper extends google.maps.OverlayView {
    /**
     * Constructor
     */
    constructor() {
        super();

        this.latLng = new google.maps.LatLng(0, 0);

        // eslint-disable-next-line no-underscore-dangle
        this.div_ = document.createElement('div');
    }

    /**
     * @param {google.maps.LatLng} latLng
     * @returns {Point}
     */
    fromLatLngToPoint(latLng) {
        let projection = this.getProjection(),
            pixel = projection.fromLatLngToDivPixel(latLng);

        return new Point(pixel.x, pixel.y);
    }

    /**
     * @param {Point} point
     * @returns {google.maps.LatLng}
     */
    fromPointToLatLng(point) {
        let projection = this.getProjection();

        return projection.fromDivPixelToLatLng(point);
    }

    /**
     * @param {Function} callback
     */
    onDrawn(callback) {
        this.listener = callback;
    }

    /**
     * Create the html
     */
    draw() {
        // eslint-disable-next-line no-underscore-dangle
        this.div_.style.left = 0;

        // eslint-disable-next-line no-underscore-dangle
        this.div_.style.top = 0;

        if (undefined !== this.listener) {
            this.listener.call(null, this.getProjection());
        }
    }

    /**
     * Executed when the element is added to the DOM
     */
    onAdd() {
        let panes = this.getPanes();

        // eslint-disable-next-line no-underscore-dangle
        panes.floatPane.appendChild(this.div_);
    }

    /**
     * Executed when the element is removed from the DOM
     */
    onRemove() {
        // eslint-disable-next-line no-underscore-dangle
        this.div_.parentNode.removeChild(this.div_);
    }
}
