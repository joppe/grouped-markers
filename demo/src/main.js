import google from 'google-maps';
import $ from 'jquery';
import {Map} from 'grouped-markers/model/Map.js';
import {GoogleMap} from 'grouped-markers/view/GoogleMap.js'

let model = new Map({
        center: new google.maps.LatLng(51.8939035, 4.5209467),
        zoom: 17
    }),
    view = new GoogleMap({
        model,
        mapOptions: {
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    });

model.on('change:gmap', () => {
    if (null !== model.get('gmap')) {
        // start adding markers to the map model
    }
});

$('body').append(view.render().el);