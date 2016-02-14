# Marker clusterer

With this script it is easy to cluster markers that are placed on a Google Map.
The script uses Backbone to handle all data.


## Usage

- Create a map model with at least a center and a zoom attribute.
- Create a map view, supply the model and optionally provide [map options](https://developers.google.com/maps/documentation/javascript/reference#MapOptions).
- Listen to the `change:gmap` event on the view. When the `gmap` is set you are able to add markers to the map model. Add the markers by calling the add method of the `markers` attribute, like: `model.get('markers').add({latLng: new google.maps.LatLng(51.8939035, 4.5209467)})`.


## Example

```
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
            model.get('markers').add({
                latLng: event.latLng
            });
        });
    }
});

$('body').append(view.render().el);
```