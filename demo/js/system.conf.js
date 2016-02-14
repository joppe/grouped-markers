/*global System*/

System.config({
    baseURL: '../',

    transpiler: 'babel',

    map: {
        'google-maps-loader': 'dist/vendor/google-maps-loader/dist/google-maps-loader.js',
        underscore: 'dist/vendor/underscore/underscore.js',
        backbone: 'dist/vendor/backbone/backbone.js',
        jquery: 'dist/vendor/jquery/dist/jquery.js'
    },

    paths: {
        'marker-clusterer/*': 'dist/marker-clusterer/*',
        'google-maps': 'http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&language=nl'
    },

    meta: {
        backbone: {
            deps: ['jquery', 'underscore']
        },
        'google-maps': {
            build: false,
            loader: 'google-maps-loader'
        }
    }
});