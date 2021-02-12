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

const TYPE_OF_BUILDINGS = ['palace', 'flat', 'house', 'bungalow'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const CHECK_TIME = ['12:00', '13:00', '14:00'];

const getRandomArray = (arr) => {
  return arr.slice(0, getRandomNumber(0, arr.length))
};

const PRICE = {
  min: 8000,
  max: 40000,
};
const ROOMS = {
  min: 1,
  max: 10,
};
const GUESTS = {
  min: 1,
  max: 10,
}

const LOCATION_X_MIN = 35.65000;
const LOCATION_X_MAX = 35.70000;
const LOCATION_Y_MIN = 139.70000;
const LOCATION_Y_MAX = 139.80000;
const FLOATING_POINT_NUMBER = 5;

const getObj = function () {
  let locationX = getFloatingRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX, FLOATING_POINT_NUMBER);
  let locationY = getFloatingRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX, FLOATING_POINT_NUMBER);
  return {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(1, 8)}.png`,
    },
    offer: {
      title: 'Заголовок придуманный самостоятельно',
      address: [locationX, locationY],
      price: getRandomNumber(PRICE.min, PRICE.max),
      type: getRandomOneArray(TYPE_OF_BUILDINGS),
      rooms: getRandomNumber(ROOMS.min, ROOMS.max),
      guests: getRandomNumber(GUESTS.min, GUESTS.max),
      checkin: getRandomOneArray(CHECK_TIME),
      checkout: getRandomOneArray(CHECK_TIME),
      features: getRandomArray(FEATURES),
      description: 'Самостоятельно придуманное описание помещения',
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
};

const array = [];
const getArray = () => {
  array.push(getObj());
  return array;
};
for (let i = 0; i < 10; i++) {
  getArray();
}
