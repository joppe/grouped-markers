# es6 module loader

## Introduction

When importing a es source the following steps (hooks) are done to get the code:

- Normalize the module name
- Locate, get the url of the file name to load
- Fetch, load the file
- Translate, make any source modifications.
- Instantiate, determine its dependencies, and how to execute it.

Each step/hook can either return a result directly, or a promise for the result.

The use of a custom loader can be done in two ways:

- When configuring systemjs.
    ```
    System.config({
      // locate the plugin via map configuration
      // (alternatively have it in the baseURL)
      map: {
        text: '/path/to/text-plugin.js'
      },
      // use meta configuration to reference which modules
      // should use the plugin loader
      meta: {
        'templates/*.html': {
          loader: 'text'
        }
      }
    });
    ```
- When importing a module
    `System.import('some/file.txt!text')`, the excamation mark separates the url to the module and the loader.

## Resources

### Reference

- https://github.com/ModuleLoader/es6-module-loader/blob/master/docs/loader-extensions.md
- https://github.com/systemjs/systemjs/blob/master/docs/creating-plugins.md
- https://gist.github.com/wycats/51c96e3adcdb3a68cbc3
- https://www.omniref.com/js/npm/es6-module-loader/0.5.4

### Implementation

- https://github.com/systemjs/systemjs/issues/314
- https://github.com/HeinrichFilter/systemjs-plugin-googlemaps/blob/master/googlemaps.js

### Tutorial

- http://jrburke.com/2015/02/13/how-to-know-when-es-modules-are-done/

### Promises

- http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
