import google from 'google-maps';
import {Point} from './Point.js';

/**
 * @class ProjectionHelper
 */
export class ProjectionHelper extends google.maps.OverlayView {
    constructor() {
        super();

        this.latLng = new google.maps.LatLng(0, 0);
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

        return  projection.fromDivPixelToLatLng(point);
    }

    /**
     * @param {Function} callback
     */
    onDrawn(callback) {
        this.listener = callback;
    }

    draw() {
        this.div_.style.left = 0;
        this.div_.style.top = 0;

        if (undefined !== this.listener) {
            this.listener.call(null, this.getProjection());
        }
    }

    onAdd() {
        var panes = this.getPanes();

        panes.floatPane.appendChild(this.div_);
    }

    onRemove() {
        this.div_.parentNode.removeChild(this.div_);
    }
}