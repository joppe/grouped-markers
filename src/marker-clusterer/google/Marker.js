import google from 'google-maps';

/**
 * @class Marker
 */
export class Marker extends google.maps.OverlayView {
    /**
     * @param {google.maps.LatLng} latLng
     * @param {jQuery} $div
     */
    constructor(latLng, $div) {
        super();

        this.latLng = latLng;

        this.$div = $div;

        // eslint-disable-next-line no-underscore-dangle
        this.div_ = this.$div.get(0);
    }

    /**
     * @param {google.maps.LatLng} latLng
     */
    setLatLng(latLng) {
        this.latLng = latLng;

        this.draw();
    }

    /**
     * Create the html
     */
    draw() {
        let projection = this.getProjection(),
            position = projection.fromLatLngToDivPixel(this.latLng);

        this.$div.css({
            left: position.x - (this.getWidth() / 2),
            top: position.y - (this.getHeight() / 2)
        });
    }

    /**
     * @returns {number}
     */
    getWidth() {
        return this.$div.width();
    }

    /**
     * @returns {number}
     */
    getHeight() {
        return this.$div.height();
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
