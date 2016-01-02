import React from 'react';
import ReactDOM from 'react-dom';
import google from 'google-maps';
import {GoogleMap} from 'grouped-markers/view/GoogleMap.js';
import {Map} from 'grouped-markers/model/Map.js';
import {Area} from 'grouped-markers/helper/Area.js';
import {Point} from 'grouped-markers/helper/Point.js';

let map = new Map({
        center: new google.maps.LatLng(51.8939035, 4.5209467),
        zoom: 17
    }),
    options = {
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

map.on('change:map', () => {
    if (null !== map.get('map')) {
        // start adding markers to the map model
    }
});

ReactDOM.render(
    <GoogleMap model={map} mapOptions={options} mapSize={{width: '100%', height: '100%'}} />,
    document.querySelector('.js-map')
);