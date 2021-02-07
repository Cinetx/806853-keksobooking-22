'use strict'
import _ from 'lodash'

const getRandomNumber = (min = 1, max) => {
  min = Math.round(Math.abs(min));
  max = Math.round(Math.abs(max));
  return Math.round(Math.random() * (max - min)) + min;
};

const getFloatingRandomNumber = (min, max, floatingPoint) => {
  min = Math.abs(min);
  max = Math.abs(max);
  let randomNumber = (Math.random() * (max - min)) + min;
  return Number(randomNumber.toFixed(floatingPoint));
};

const getRandomArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const typeOfBuildings = ['palace', 'flat', 'house', 'bungalow'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const checkTime = ['12:00', '13:00', '14:00'];

const PRICE = getRandomNumber(1, 100000);
const ROOMS = getRandomNumber(1, 4);
const GUESTS = getRandomNumber(1, 8);
const LOCATION_X_MIN = 35.65000;
const LOCATION_X_MAX = 35.70000;
const LOCATION_Y_MIN = 139.70000;
const LOCATION_Y_MAX = 139.80000;
const FLOATING_POINT_NUMBER = 5;

const getArray = function (price, rooms, guests) {
  return [
    {
      objName: 'author',
      avatar: `img/avatars/user0${getRandomNumber(1, 8)}.png`,
    },
    {
      objName: 'offer',
      title: 'Заголовок придуманный самостоятельно',
      address: [location.x, location.y],
      price: price,
      type: getRandomArray(typeOfBuildings),
      rooms: rooms,
      guests: guests,
      checkin: getRandomArray(checkTime),
      checkout: getRandomArray(checkTime),
      features: _.sampleSize(features, [getRandomNumber(undefined, features.length)]),
      // Берем _.sampleSize из lodash.
      /* в [number] передаем значение функцию getRandomNumber(), в которой
      min = по умолчанию - undefined(то есть 1)
      max = длине передаваемого массива */
      description: 'Самостоятельно придуманное описание помещения',
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
      location: {
        x: getFloatingRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX, FLOATING_POINT_NUMBER),
        y: getFloatingRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX, FLOATING_POINT_NUMBER),
      },
    },
  ]
};
getArray(PRICE, ROOMS, GUESTS);
