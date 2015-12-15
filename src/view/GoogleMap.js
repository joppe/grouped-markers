import React from 'react';
import ReactDOM from 'react-dom';
import {ReactView} from './ReactView.js';
import google from 'google-maps';
import {ProjectionHelper} from './../helper/ProjectionHelper.js';

/**
 * @class GoogleMap
 */
export class GoogleMap extends ReactView {
    /**
     * When the element is rendered create the google map.
     */
    componentDidMount() {
        let el = ReactDOM.findDOMNode(this.refs.map),
            projectionHelper,
            map = this.props.map,
            gmap = new google.maps.Map(el, map.get('options'));

        /**
         * Create an ProjectionHelper, this is needed to translate pixels to latLng and vice versa.
         *
         * @link https://developers.google.com/maps/documentation/javascript/reference?hl=en#MapCanvasProjection
         */
        projectionHelper = new ProjectionHelper();
        projectionHelper.onDrawn(() => {
            map.setProjectionHelper(projectionHelper);
        });
        projectionHelper.setMap(gmap);
    }

    /**
     * @returns {XML}
     */
    render() {
        let size = this.props.size;

        return (
            <div className="google-map" ref="map" style={{width: size.width, height: size.height}} />
        );
    }
}