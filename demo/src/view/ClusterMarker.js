import Backbone from 'backbone';
import {Marker as CustomMarker} from 'marker-clusterer/google/Marker.js';

/**
 * @class ClusterMarker
 */
export class ClusterMarker extends Backbone.View {
    /**
     * @returns {string}
     */
    get className() {
        return 'c-marker';
    }

    /**
     * @param {Object} options
     */
    constructor(options) {
        super(options);

        this.mapModel = options.mapModel;
        this.marker = new CustomMarker(this.model.getCenter(), this.$el);

        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'change:bounds', this.position);
        this.listenTo(this.model.get('markers'), 'add remove reset', this.update);

        this.update();
    }

    /**
     * @param {google.maps.Map} gmap
     */
    setMap(gmap) {
        this.marker.setMap(gmap);

        this.el.addEventListener('contextmenu', (event) => {
            event.preventDefault();

            let marker = this.model.get('markers').last();

            this.mapModel.get('markers').remove(marker);
        });
    }

    /**
     * Position the marker
     */
    position() {
        this.marker.setLatLng(this.model.getCenter());
    }

    /**
     * Update the contents
     */
    update() {
        let count = this.model.count();

        if (0 === count) {
            this.model.trigger('destroy');
        } else {
            this.$el.html(`<div class="c-marker__count">${count}</div>`);
        }
    }

    /**
     * Remove the element from the map
     */
    remove() {
        this.stopListening();
        this.marker.setMap(null);
    }
}
