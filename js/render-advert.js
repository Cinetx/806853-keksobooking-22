import { data } from './data.js';
import { setInnerText } from './util.js';

const map = document.querySelector('#map-canvas');

const renderFeatures = (container, featuresList) => {
  container.innerHTML = '';
  featuresList.forEach((item) => {
    const feature = document.createElement('li');
    feature.classList.add('popup__feature', `popup__feature--${item}`)
    feature.textContent = item;
    container.appendChild(feature)
  });
};

const renderPhoto = (container, photo, photoList) => {
  container.innerHTML = '';
  photoList.forEach((photoLink) => {
    const advertPhotoClone = photo.cloneNode(true);
    advertPhotoClone.src = photoLink;
    container.appendChild(advertPhotoClone);
  });
};

const creatAdvert = (dataItem) => {

  const templateAdvert = document.querySelector('#card').content;
  const advert = templateAdvert.cloneNode(true);
  const { offer, author } = dataItem;
  const { avatar } = author;
  const { title, address, type, features, description, price, rooms, guests, checkin, checkout, photos } = offer;

  setInnerText(advert.querySelector('.popup__title'), title);
  setInnerText(advert.querySelector('.popup__text--address'), address);
  setInnerText(advert.querySelector('.popup__type'), type);
  setInnerText(advert.querySelector('.popup__description'), description);
  setInnerText(advert.querySelector('.popup__text--price'), `${price} ₽/ночь.`);
  setInnerText(advert.querySelector('.popup__text--capacity'), `${rooms} комнаты для ${guests} гостей`);
  setInnerText(advert.querySelector('.popup__text--time'), `Заезд после ${checkin}, выезд до ${checkout}`);

  renderFeatures(advert.querySelector('.popup__features'), features);
  renderPhoto(advert.querySelector('.popup__photos'),
    advert.querySelector('.popup__photo'),
    photos);
  advert.querySelector('.popup__avatar').src = avatar;

  return advert
};


const renderAdvert = (advertData) => {
  map.appendChild(creatAdvert(advertData[0]));
};

renderAdvert(data);

