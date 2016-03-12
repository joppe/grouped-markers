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

        this.marker = new CustomMarker(this.model.getCenter(), this.$el);

        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'change:bounds', this.position);
        this.listenTo(this.model.get('markers'), 'add', this.update);

        this.update();
    }

    /**
     * @param {google.maps.Map} gmap
     */
    setMap(gmap) {
        this.marker.setMap(gmap);
    }

    position() {
        this.marker.setLatLng(this.model.getCenter());
    }

    update() {
        let count = this.model.count();

        if (0 === count) {
            this.model.trigger('destroy');
        } else {
            this.$el.html(`<div class="c-marker__count">${count}</div>`);
        }
    }

    remove() {
        this.stopListening();
        this.marker.setMap(null);
    }
}