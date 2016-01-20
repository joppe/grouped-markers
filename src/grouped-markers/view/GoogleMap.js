import google from 'google-maps';
import _ from 'underscore';
import Backbone from 'backbone';
import {ProjectionHelper} from './../google/ProjectionHelper.js';

/**
 * @class GoogleMap
 */
export class GoogleMap extends Backbone.View {
    /**
     * @returns {string}
     */
    get className() {
        return 'c-google-maps';
    }

    /**
     * @param {Object} options
     */
    constructor(options) {
        super(options);

        this.mapOptions = options.mapOptions;

        this.listenToOnce(this.model, 'change:gmap', this.createProjectionHelper);
        this.listenToOnce(this.model, 'change:projectionHelper', this.ready);
    }

    /**
     * Create an ProjectionHelper, this is needed to translate pixels to latLng and vice versa.
     *
     * @link https://developers.google.com/maps/documentation/javascript/reference?hl=en#MapCanvasProjection
     */
    createProjectionHelper() {
        let projectionHelper = new ProjectionHelper();

        projectionHelper.onDrawn(() => {
            this.model.set({
                projectionHelper
            });
        });
        projectionHelper.setMap(this.model.get('gmap'));
    }

    ready() {
        let clusters = this.model.get('clusters');

        this.listenTo(clusters, 'add', this.addCluster);
        this.listenTo(clusters, 'remove', this.removeCluster);
        this.listenTo(clusters, 'reset', this.removeClusters);

        this.model.reindex();
    }

    addCluster() {
        console.log('addCluster');
    }

    removeCluster() {
        console.log('removeCluster');
    }

    removeClusters() {
        console.log('removeClusters');
    }

    /**
     * @returns {GoogleMap}
     */
    render() {
        // Create the google map instance and store it in the model
        this.model.set('gmap', new google.maps.Map(this.el, _.extend(
            {},
            {
                zoom: this.model.get('zoom'),
                center: this.model.get('center')
            },
            this.mapOptions
        )));

        return this;
    }
}