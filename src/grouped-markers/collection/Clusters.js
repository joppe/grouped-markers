import Backbone from 'backbone';
import {Cluster} from './../model/Cluster.js';

/**
 * @class Clusters
 */
export class Clusters extends Backbone.Collection {
    /**
     * @returns {Cluster}
     */
    get model() {
        return Cluster;
    }
}