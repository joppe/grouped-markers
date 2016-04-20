import Backbone from 'backbone';
import {Markers} from './../collection/Markers.js';
import {Clusters} from './../collection/Clusters.js';
import {Cluster} from './Cluster.js';

/**
 * @class Map
 */
export class Map extends Backbone.Model {
    /**
     * @returns {Object}
     */
    get defaults() {
        return {
            gmap: null,
            projectionHelper: null,
            markers: new Markers(),
            clusters: new Clusters(),
            gridSize: 100
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

    /**
     * By removing all cluster models we ensure that for each cluster model a "remove" event is fired.
     */
    resetClusters() {
        this.get('clusters').remove(this.get('clusters').models);
    }

    /**
     * Remove all clusters and create new ones based on the current markers.
     */
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
            cluster = clusters.find((c) => {
                return c.contains(marker);
            });

        // Create new cluster
        if (undefined === cluster) {
            cluster = new Cluster({
                gridSize: this.get('gridSize')
            }, {
                projectionHelper: this.get('projectionHelper')
            });
            cluster.addMarker(marker);

            clusters.add(cluster);
        } else {
            cluster.addMarker(marker);
        }
    }

    /**
     * @param {Marker} marker
     */
    removeMarkerFromCluster(marker) {
        let cluster = this.get('clusters').find((c) => {
            return c.get('markers').contains(marker);
        });

        if (undefined === cluster) {
            throw new Error('Marker not found on any cluster (Map.removeMarkerFromCluster())');
        }

        cluster.removeMarker(marker);
    }
}
