/* global L:readonly */
import { advertForm, mapFileterForm, formActive } from './form.js';
import { creatAdvert } from './render-advert.js';

const addressInput = advertForm.querySelector('#address');
const TokyoLocation = {
  X: 35.6895000,
  Y: 139.6917100,
}

const map = L.map('map-canvas')
  // Перевод страницы в активное состояние.
  .on('load', () => {
    formActive(advertForm);
    formActive(mapFileterForm);
    // Запрещаем ручное редактирование поля
    addressInput.setAttribute('readonly', 'readonly')
    addressInput.value = TokyoLocation.X + ' ' + TokyoLocation.Y;
  })

  // Находим координаты
  .setView({
    lat: TokyoLocation.X,
    lng: TokyoLocation.Y,
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
const mainMarker = L.marker(
  {
    lat: TokyoLocation.X,
    lng: TokyoLocation.Y,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

// Функция возвращение маркера на изначальное место
const defaultMarkerPosition = () => {
  mainMarker.setLatLng([TokyoLocation.X, TokyoLocation.Y])
}

// Передача координат в строку адреса
mainMarker.on('move', () => {
  addressInput.value = mainMarker.getLatLng().lat.toFixed(2) + ' ' + mainMarker.getLatLng().lng.toFixed(2)
})

// добавляем маркер
mainMarker.addTo(map);

// Создание маркеров
// Создаем слой маркеров
const markers = L.layerGroup().addTo(map);

const renderMarker = (data) => {
  // Чистим слой маркеров перед каждым рендером
  markers.clearLayers()
  data.forEach((item) => {
    const locationLat = item.location.lat;
    const locationLng = item.location.lng;

    // Создание иконки
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
      .addTo(markers)
      .bindPopup(creatAdvert(item));
  });
}

export { addressInput, defaultMarkerPosition, renderMarker };

