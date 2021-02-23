import { getRandom } from './util.js';

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const CHECK_TIME = ['12:00', '13:00', '14:00'];
const TypeOfBuildings = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
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

const getAdvertData = function () {
  let locationX = getRandom(LOCATION_X_MIN, LOCATION_X_MAX, FLOATING_POINT_NUMBER);
  let locationY = getRandom(LOCATION_Y_MIN, LOCATION_Y_MAX, FLOATING_POINT_NUMBER);
  return {
    author: {
      avatar: [`img/avatars/user0${getRandom(1, 8)}.png`],
    },
    offer: {
      title: 'Заголовок придуманный самостоятельно',
      address: [locationX, locationY],
      price: getRandom(PRICE.min, PRICE.max),
      type: getRandom(TypeOfBuildings),
      rooms: getRandom(ROOMS.min, ROOMS.max),
      guests: getRandom(GUESTS.min, GUESTS.max),
      checkin: getRandom(CHECK_TIME),
      checkout: getRandom(CHECK_TIME),
      features: getRandom(0, FEATURES),
      description: 'Самостоятельно придуманное описание помещения',
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
};

const getRandomData = (count) => {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(getAdvertData());
  }
  return array;
};

const data = getRandomData(10);

export {data};
