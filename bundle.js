/*global require, console*/

var Builder = require('systemjs-builder'),
    builder = new Builder('./', 'demo/js/system.conf.js');

builder
    .buildStatic('demo/src/main.js', 'dist/marker-clusterer.min.js', {
        minify: true,
        sourceMaps: true
    })
    .then(function () {
        'use strict';

        console.log('Build complete');
    })
    .catch(function (err) {
        'use strict';

        console.log('Build error');
        console.log(err);
    })
;