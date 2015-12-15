import React from 'react';
import ReactDOM from 'react-dom';
import google from 'google-maps';
import {Map} from './model/Map.js';
import {GoogleMap} from './view/GoogleMap.js';

let map = new Map({
        options: {
            zoom: 10,
            center: { // = center of Rotterdam
                lat: 51.9244201,
                lng: 4.477732500000002
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    }),
    container = document.createElement('div');

document.body.appendChild(container);

ReactDOM.render(
    <GoogleMap map={map} size={{width: '400px', height: '400px'}} />,
    container
);
