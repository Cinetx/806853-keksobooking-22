'use strict'

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

const getRandomOneArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const typeOfBuildings = ['palace', 'flat', 'house', 'bungalow'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const checkTime = ['12:00', '13:00', '14:00'];

const getRandomArray = (arr) => {
  return arr.slice(0, getRandomNumber(0, arr.length))
};

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
      type: getRandomOneArray(typeOfBuildings),
      rooms: rooms,
      guests: guests,
      checkin: getRandomOneArray(checkTime),
      checkout: getRandomOneArray(checkTime),
      features: getRandomArray(features),
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
