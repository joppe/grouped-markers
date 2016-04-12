import {AbstractMap} from 'marker-clusterer/view/AbstractMap.js';
import {ClusterMarker} from './ClusterMarker.js';

/**
 * @class GoogleMap
 */
export class GoogleMap extends AbstractMap {
    /**
     * @returns {string}
     */
    get className() {
        return 'c-google-maps';
    }

    /**
     * @param {Cluster} cluster
     */
    addCluster(cluster) {
        let marker = new ClusterMarker({
            model: cluster,
            mapModel: this.model
        });

        marker.setMap(this.model.get('gmap'));
    }
}
