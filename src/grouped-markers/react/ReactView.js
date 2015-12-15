import React from 'react';
import {Listener} from '../grouped-markers/helper/Listener.js';

/**
 * @class ReactView
 */
export class ReactView extends React.Component {
    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.listener = new Listener();
    }

    /**
     * @param {Backbone.Model} model
     * @param {string} events
     */
    watchModel(model, events = 'change') {
        this.watch(model, events);
    }

    /**
     * @param {Backbone.Collection} model
     * @param {string} events
     */
    watchCollection(model, events = 'add remove reset') {
        this.watch(model, events);
    }

    /**
     * @param {Backbone.Model|Backbone.Collection} model
     * @param {string} events
     */
    watch(model, events) {
        this.listener.listenTo(model, events, function () {
            this.forceUpdate();
        }.bind(this));
    }

    componentWillUnmount() {
        this.listener.stopListening();
    }
}