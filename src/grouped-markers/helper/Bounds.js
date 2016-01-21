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
     * @returns {Bounds}
     */
    add(latLng) {
        this.area.add(this.projectionHelper.fromLatLngToPoint(latLng));

        this.updateBounds();

        return this;
    }

    /**
     * @param {google.maps.LatLng} latLng
     * @returns {Bounds}
     */
    remove(latLng) {
        this.area.remove(this.projectionHelper.fromLatLngToPoint(latLng));

        this.updateBounds();

        return this;
    }

    updateBounds() {
        this.bounds = new google.maps.LatLngBounds(
            this.projectionHelper.fromPointToLatLng(this.area.bottomLeft),
            this.projectionHelper.fromPointToLatLng(this.area.topRight)
        )
    }

    /**
     * @returns {google.maps.LatLng}
     */
    getCenter() {
        return this.bounds.getCenter();
    }
}