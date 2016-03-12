System.register(['google-maps', 'jquery', 'marker-clusterer/model/Map.js', './view/GoogleMap.js'], function (_export) {
    'use strict';

    var google, $, Map, GoogleMap, model, view;
    return {
        setters: [function (_googleMaps) {
            google = _googleMaps['default'];
        }, function (_jquery) {
            $ = _jquery['default'];
        }, function (_markerClustererModelMapJs) {
            Map = _markerClustererModelMapJs.Map;
        }, function (_viewGoogleMapJs) {
            GoogleMap = _viewGoogleMapJs.GoogleMap;
        }],
        execute: function () {
            model = new Map({
                center: new google.maps.LatLng(51.8939035, 4.5209467),
                zoom: 17
            });
            view = new GoogleMap({
                model: model,
                mapOptions: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
            });

            model.on('change:gmap', function () {
                var gmap = model.get('gmap');

                if (null !== gmap) {
                    gmap.addListener('click', function (event) {
                        model.get('markers').add({
                            latLng: event.latLng
                        });
                    });
                }
            });

            $('body').append(view.render().el);
        }
    };
});