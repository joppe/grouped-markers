import Backbone from 'backbone';
import google from 'google-maps';
import {Markers} from './../collection/Markers.js';
import {Clusters} from './../collection/Clusters.js';

/**
 * @class Map
 */
export class Map extends Backbone.Model {
    /**
     * @returns {Object}
     */
    get defaults() {
        return {
            map: null,
            projectionHelper: null,
            markers: new Markers(),
            clusters: new Clusters()
        };
    }

    /**
     * @param {Object} attributes
     * @param {Object} options
     */
    constructor(attributes, options) {
        super(attributes, options);

        this.listenTo(this.get('markers'), 'reset', this.resetClusters);
        this.listenTo(this.get('markers'), 'add', this.addMarkerToCluster);
        this.listenTo(this.get('markers'), 'remove', this.removeMarkerFromCluster);
    }

    resetClusters() {
        // By removing all cluster models we ensure that for each cluster model a "remove" event is fired.
        this.get('clusters').remove(this.get('clusters').models);
    }

    reindex() {
        this.resetClusters();

        this.get('markers').each((marker) => {
            this.addMarkerToCluster(marker);
        });
    }

    /**
     * @param {Array} markers
     */
    setMarkers(markers) {
        this.get('markers').reset(markers);
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
            cluster = clusters.add({}, {
                projectionHelper: this.get('projectionHelper')
            });
        }

        cluster.addMarker(marker);
    }

    /**
     * @param {Marker} marker
     */
    removeMarkerFromCluster(marker) {
        let cluster = this.get('clusters').find((cluster) => {
                return cluster.get('markers').contains(marker);
            });

        if (undefined === cluster) {
            throw `Marker not found on any cluster (Map.removeMarkerFromCluster())`;
        }

        cluster.removeMarker(marker);
    }
}