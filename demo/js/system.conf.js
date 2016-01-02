/*global System*/

System.config({
    baseURL: '../',

    transpiler: 'babel',

    map: {
        'google-maps-loader': 'dist/vendor/google-maps-loader/dist/google-maps-loader.js',
        underscore: 'dist/vendor/underscore/underscore.js',
        backbone: 'dist/vendor/backbone/backbone.js',
        react: 'dist/node_modules/react/dist/react.js',
        'react-dom': 'dist/node_modules/react-dom/dist/react-dom.js',
        jquery: 'dist/vendor/jquery/dist/jquery.js'
    },

    paths: {
        'grouped-markers/*': 'dist/grouped-markers/*',
        'google-maps': 'http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&language=nl'
    },

    meta: {
        backbone: {
            deps: ['jquery', 'underscore']
        },
        'react-dom': {
            deps: ['react']
        },
        'google-maps': {
            build: false,
            loader: 'google-maps-loader'
        }
    }
});