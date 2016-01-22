import Backbone from 'backbone';
import {Marker as CustomMarker} from './../google/Marker.js';

export class Marker extends Backbone.View {
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
        this.listenTo(this.model.get('markers'), 'add', this.update);

        this.update();
    }

    /**
     * @param {google.maps.Map} gmap
     */
    setMap(gmap) {
        this.marker.setMap(gmap);
    }

    update() {
        this.$el.html(this.model.count());
    }

    remove() {
        this.stopListening();
        this.marker.setMap(null);
    }
}