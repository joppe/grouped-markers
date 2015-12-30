import google from 'google-maps';

let container = document.createElement('div');

container.style.width = '400px';
container.style.height = '400px';

document.body.appendChild(container);

new google.maps.Map(container, {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
});