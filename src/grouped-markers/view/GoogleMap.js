import React from 'react';
import ReactDOM from 'react-dom';
import {ReactView} from './../react/ReactView.js';
import google from 'google-maps';
import {ProjectionHelper} from './../google/ProjectionHelper.js';

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
            model = this.props.model,
            options = this.props.mapOptions,
            map;

        options.zoom = model.get('zoom');
        options.center = {
            lat: model.get('center').lat(),
            lng: model.get('center').lng()
        };

        map = new google.maps.Map(el, options);

        /**
         * Create an ProjectionHelper, this is needed to translate pixels to latLng and vice versa.
         *
         * @link https://developers.google.com/maps/documentation/javascript/reference?hl=en#MapCanvasProjection
         */
        projectionHelper = new ProjectionHelper();
        projectionHelper.onDrawn(() => {
            model.set({
                map,
                projectionHelper
            });
        });
        projectionHelper.setMap(map);
    }

    /**
     * @returns {XML}
     */
    render() {
        let size = this.props.mapSize;

        return (
            <div className="google-map" ref="map" style={{width: size.width, height: size.height}} />
        );
    }
}