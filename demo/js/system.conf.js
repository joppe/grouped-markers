/*global System*/

System.config({
    baseURL: '../',

    transpiler: 'babel',

    map: {
        'google-maps-loader': 'dist/helper/google-map-loader.js'
    },

    paths: {
        'google-maps': 'http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&language=nl'
    },

    meta: {
        'google-maps': {
            build: false,
            loader: 'google-maps-loader'
        }
    }
});