import Backbone from 'backbone';
import google from 'google-maps';
import {Markers} from '../grouped-markers/collection/Markers.js';
import {Clusters} from '../grouped-markers/collection/Clusters.js';

/**
 * @class Map
 */
export class Map extends Backbone.Model {
    /**
     * @returns {Object}
     */
    get defaults() {
        return {
            drawable: false,
            options: {},
            markers: new Markers(),
            clusters: new Clusters()
        };
    }

    /**
     * @param {ProjectionHelper} projectionHelper
     */
    setProjectionHelper(projectionHelper) {
        this.set({
            projectionHelper,
            drawable: true
        });
    }

    /**
     * @param {Markers} markers
     */
    setMarkers(markers) {
        if (this.get('markers') !== markers) {
            this.reset();

            this.set('markers', markers);

            this.reindex();

            this.listenTo(this.get('markers'), 'reset', this.reset);
            this.listenTo(this.get('markers'), 'add', this.addMarkerToCluster);
        }
    }

    reset() {
        this.stopListening(this.get('markers'));
        this.get('clusters').reset();
    }

    reindex() {
        this.get('clusters').reset();

        this.get('markers').each((marker) => {
            this.addMarkerToCluster(marker);
        });
    }

    /**
     * @param {Marker} marker
     */
    addMarkerToCluster(marker) {
        let clusters = this.get('clusters'),
            cluster = clusters.find((cluster) => {
                return cluster.contains(marker);
            });

        // Create new cluster
        if (undefined === cluster) {
            cluster = clusters.add({
                projectionHelper: this.get('projectionHelper')
            });
        }

        cluster.addMarker(marker);
    }
}