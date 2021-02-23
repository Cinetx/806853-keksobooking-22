/* global L:readonly */
import { advertForm, mapFileterForm, formActive } from './util.js';
import { data } from './data.js';
import { creatAdvert } from './render-advert.js';

const map = L.map('map-canvas')
  // Перевод страницы в активное состояние.
  .on('load', () => {
    formActive(advertForm);
    formActive(mapFileterForm);
    // Запрещаем ручное редактирование поля запрещено, однако поле должно быть доступно,
    // чтобы значение отправлялось на сервер с формой.
    const addressInput = advertForm.querySelector('#address');
    addressInput.setAttribute('readonly', 'readonly')
  })

  // Находим координаты
  .setView({
    lat: 35.6895000,
    lng: 139.6917100,
  }, 12);

// Загружаем стороннюю карту и добавляем ее
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// создаем маркер
const marker = L.marker(
  {
    lat: 35.6895000,
    lng: 139.6917100,

  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
// добавляем маркер
marker.addTo(map);

// Создаем много маркеров
data.forEach((item) => {
  const locationX = item.location.x;
  const locationY = item.location.y;

  const icon = L.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat: locationX,
      lng: locationY,
    },
    {
      icon: icon,
    },
  );
  marker
    .addTo(map)
    .bindPopup(creatAdvert(item));
});
