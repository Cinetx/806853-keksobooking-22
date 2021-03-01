/* global L:readonly */
import { advertForm, mapFileterForm, formActive } from './form.js';
import { getData } from './api.js';
import { creatAdvert } from './render-advert.js';

const addressInput = advertForm.querySelector('#address');
const TOKYO_LOCATION_X = 35.6895000;
const TOKYO_LOCATION_Y = 139.6917100;

const map = L.map('map-canvas')
  // Перевод страницы в активное состояние.
  .on('load', () => {
    formActive(advertForm);
    formActive(mapFileterForm);
    // Запрещаем ручное редактирование поля
    addressInput.setAttribute('readonly', 'readonly')
  })

  // Находим координаты
  .setView({
    lat: TOKYO_LOCATION_X,
    lng: TOKYO_LOCATION_Y,
  }, 10);

// Загружаем стороннюю карту и добавляем ее
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// создаем маркер
const marker = L.marker(
  {
    lat: TOKYO_LOCATION_X,
    lng: TOKYO_LOCATION_Y,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

// Функция возвращение маркера на изначальное место
const defaultMarkerPosition = () => {
  marker.setLatLng([TOKYO_LOCATION_X, TOKYO_LOCATION_Y])
}

// Передача координат в строку адреса
marker.on('move', () => {
  addressInput.value = marker.getLatLng();
})

// добавляем маркер
marker.addTo(map);

// Создание маркеров

const renderMarker = (data) => {
  data.forEach((item) => {
    const locationLat = item.location.lat;
    const locationLng = item.location.lng;

    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
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
      .addTo(map)
      .bindPopup(creatAdvert(item));
  });
}

// Рендер объявлений
getData(renderMarker);

export {addressInput, defaultMarkerPosition};

