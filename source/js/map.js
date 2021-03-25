import L from 'leaflet';
import { advertFormElement, mapFileterFormElement, formActive } from './form.js';
import { creatAdvert } from './render-advert.js';

const TokyosLocation = {
  X: 35.68,
  Y: 139.69,
}
const mainPinStyle = {
  url: 'img/main-pin.svg',
  size: [52, 52],
  anchor: [26, 52],
};
const pinStyle = {
  url: 'img/pin.svg',
  size: [40, 40],
  anchor: [20, 40],
}
const LAT_LNG_FLOATING_POINT = 2;
const DISTANCE_MAP = 10;

const addressInputElement = advertFormElement.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    formActive(advertFormElement);
    formActive(mapFileterFormElement);

    addressInputElement.setAttribute('readonly', 'readonly')
    addressInputElement.value = TokyosLocation.X + ' ' + TokyosLocation.Y;
  })


  .setView({
    lat: TokyosLocation.X,
    lng: TokyosLocation.Y,
  }, DISTANCE_MAP);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: mainPinStyle.url,
  iconSize: mainPinStyle.size,
  iconAnchor: mainPinStyle.anchor,
});

const mainMarker = L.marker(
  {
    lat: TokyosLocation.X,
    lng: TokyosLocation.Y,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const getDefaultMarkerPosition = () => {
  mainMarker.setLatLng([TokyosLocation.X, TokyosLocation.Y])
}

mainMarker.on('move', () => {
  addressInputElement.value = mainMarker.getLatLng().lat.toFixed(LAT_LNG_FLOATING_POINT) + ' ' + mainMarker.getLatLng().lng.toFixed(LAT_LNG_FLOATING_POINT)
})

mainMarker.addTo(map);

const markers = L.layerGroup().addTo(map);

const renderMarker = (data) => {
  markers.clearLayers()
  data.forEach((item) => {
    const locationLat = item.location.lat;
    const locationLng = item.location.lng;

    const icon = L.icon({
      iconUrl: pinStyle.url,
      iconSize: pinStyle.size,
      iconAnchor: pinStyle.anchor,
    });

    const marker = L.marker(
      {
        lat: locationLat,
        lng: locationLng,
      },
      {
        icon: icon,
      },
    );
    marker
      .addTo(markers)
      .bindPopup(creatAdvert(item));
  });
}

export { addressInputElement, getDefaultMarkerPosition, renderMarker };

