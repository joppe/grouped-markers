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
    let gmap = model.get('gmap');

    if (null !== gmap) {
        gmap.addListener('click', (event) => {
            console.log(event.latLng.toString())
            model.get('markers').add({
                latLng: event.latLng
            });
        });
    }
});

$('body').append(view.render().el);