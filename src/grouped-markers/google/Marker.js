import google from 'google-maps';

export class Marker extends google.maps.OverlayView {
    /**
     * @param {google.maps.LatLng} latLng
     * @param {jQuery} $div
     */
    constructor(latLng, $div) {
        super();

        this.latLng = latLng;

        this.$div = $div;
        this.div_ = this.$div.get(0);
    }

    /**
     * @param {google.maps.LatLng} latLng
     */
    setLatLng(latLng) {
        this.latLng = latLng;

        this.draw();
    }

    draw() {
        var projection = this.getProjection(),
            position = projection.fromLatLngToDivPixel(this.latLng);

        this.$div.css({
            left: position.x - (this.getWidth() / 2),
            top: position.y - this.getHeight()
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

    onAdd() {
        var panes = this.getPanes();

        panes.floatPane.appendChild(this.div_);
    }

    onRemove() {
        this.div_.parentNode.removeChild(this.div_);
    }
}