import google from 'google-maps';
import {Area} from './Area.js';

/**
 * @class Bounds
 */
export class Bounds {
    /**
     * @param {ProjectionHelper} projectionHelper
     * @param {Number} gridSize
     */
    constructor(projectionHelper, gridSize) {
        this.projectionHelper = projectionHelper;

        this.area = new Area(gridSize);
        this.bounds = new google.maps.LatLngBounds();
    }

    /**
     * @param {google.maps.LatLng} latLng
     * @returns {boolean}
     */
    contains(latLng) {
        return this.bounds.contains(latLng);
    }

    /**
     * @param {google.maps.LatLng} latLng
     */
    extend(latLng) {
        this.bounds = new google.maps.LatLngBounds(
            this.projectionHelper.fromPointToLatLng(this.area.bottomLeft),
            this.projectionHelper.fromPointToLatLng(this.area.topRight)
        )
    }
}