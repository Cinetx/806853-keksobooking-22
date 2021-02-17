import { data } from './data.js';
import { setInnerText } from './util.js';

const templateAdvert = document.querySelector('#card').content;
const advert = templateAdvert.cloneNode(true);
const advertTitle = advert.querySelector('.popup__title');
const advertAddress = advert.querySelector('.popup__text--address');
const advertPrice = advert.querySelector('.popup__text--price');
const advertType = advert.querySelector('.popup__type');
const advertCapacity = advert.querySelector('.popup__text--capacity');
const advertTime = advert.querySelector('.popup__text--time');
const advertFeatures = advert.querySelector('.popup__features');
const advertDescription = advert.querySelector('.popup__description');
const advertPhotos = advert.querySelector('.popup__photos');
const advertPhoto = advertPhotos.querySelector('.popup__photo');
const advertAvatar = advert.querySelector('.popup__avatar');


const renderFeatures = (array) => {
  advertFeatures.innerHTML = '';
  array.forEach((item) => {

    const feature = document.createElement('li');
    feature.classList.add('popup__feature', `popup__feature--${item}`)
    feature.textContent = item;
    advertFeatures.appendChild(feature)
  });
};

const renderPhoto = (array) => {
  advertPhotos.innerHTML = '';
  array.forEach((photoLink) => {
    const advertPhotoClone = advertPhoto.cloneNode(true);
    advertPhotoClone.src = photoLink;
    advertPhotos.appendChild(advertPhotoClone);
  });
};

const renderAdvert = (dataItem) => {
  const advertOffer = dataItem.offer;
  const advertAuthor = dataItem.author;
  const featuresArray = advertOffer.features;
  const photoArray = advertOffer.photos;

  setInnerText(advertTitle, advertOffer.title);
  setInnerText(advertAddress, advertOffer.address);
  setInnerText(advertType, advertOffer.type);
  setInnerText(advertFeatures, advertOffer.features);
  setInnerText(advertDescription, advertOffer.description);
  setInnerText(advertPrice, `${advertOffer.price} ₽/ночь.`);
  setInnerText(advertCapacity, `${advertOffer.rooms} комнаты для ${advertOffer.guests} гостей`);
  setInnerText(advertTime, `Заезд после ${advertOffer.checkin}, выезд до ${advertOffer.checkout}`);
  renderFeatures(featuresArray);
  renderPhoto(photoArray);
  advertAvatar.src = advertAuthor.avatar
  const map = document.querySelector('#map-canvas');
  map.appendChild(advert);
};

renderAdvert(data[0]);


