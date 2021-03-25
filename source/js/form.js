import { sendData } from './api.js';
import { addressInputElement, getDefaultMarkerPosition } from './map.js'
import { showSuccessMessage, showErrorSendDataMessage, removeMessage, errorMessage, successMessage } from './message.js';
import { avatarChooserElement, avatarPreviewElement, photoChooserElement, photoPreviewElement } from './photo.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const PricesType = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};
const RoomsValue = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const DefaultFormOptions = {
  title: '',
  time: '12:00',
  housingType: 'flat',
  room: '1',
  price: '',
  address: '',
  choser: '',
  photoURL: 'img/muffin-grey.svg',
}


const advertFormElement = document.querySelector('.ad-form');
const mapFileterFormElement = document.querySelector('.map__filters');
const timeInElement = advertFormElement.querySelector('#timein')
const timeOutElement = advertFormElement.querySelector('#timeout')
const advertTitleElement = advertFormElement.querySelector('#title');
const housingTypeElement = advertFormElement.querySelector('#type');
const advertPriceInputElement = advertFormElement.querySelector('#price');
const advertRoomNumberElement = advertFormElement.querySelector('#room_number');
const advertCapacityRoomElement = advertFormElement.querySelector('#capacity');
const optionCapacityRoomElement = advertCapacityRoomElement.querySelectorAll('option');
const featureElement = advertFormElement.querySelectorAll('input[type=checkbox]');


const clearFeature = () => {
  featureElement.forEach((item) => {
    item.checked = false;
  });
};
const formDisabled = (form) => {
  const fromFieldset = form.querySelectorAll('fieldset');
  form.classList.add(`${form.getAttribute('class')}--disabled`);

  fromFieldset.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
};

const formActive = (form) => {
  const fromFieldset = form.querySelectorAll('fieldset');
  form.classList.remove(`${form.classList[0]}--disabled`);

  fromFieldset.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
};

formDisabled(advertFormElement);
formDisabled(mapFileterFormElement);

const renderPrice = () => {
  advertPriceInputElement.min = PricesType[housingTypeElement.value];
  advertPriceInputElement.placeholder = PricesType[housingTypeElement.value];
}
renderPrice();

const onChangePrice = () => {
  renderPrice();
};

housingTypeElement.addEventListener('change', onChangePrice);

const renderTimeCheck = (checkIn, checkOut) => {
  checkIn.addEventListener('change', () => {
    checkOut.value = checkIn.value
  });
};

renderTimeCheck(timeInElement, timeOutElement);
renderTimeCheck(timeOutElement, timeInElement);

advertTitleElement.addEventListener('input', () => {
  const valueLength = advertTitleElement.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    advertTitleElement.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    advertTitleElement.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    advertTitleElement.setCustomValidity('');
  }
  advertTitleElement.reportValidity();
});

advertPriceInputElement.addEventListener('input', () => {
  const valuePrice = Number(advertPriceInputElement.value);
  const priceMin = Number(advertPriceInputElement.min);
  const priceMax = Number(advertPriceInputElement.max);
  if (valuePrice < priceMin) {
    advertPriceInputElement.setCustomValidity(`Цена не должна быть меньше ${priceMin}`);
  }
  else if (valuePrice > priceMax) {
    advertPriceInputElement.setCustomValidity(`Цена не должна превышать ${priceMax}`);
  }
  else {
    advertPriceInputElement.setCustomValidity('');
  }
  advertPriceInputElement.reportValidity();
});

const onRoomsNumberSelect = (peopleAmount) => {
  optionCapacityRoomElement.forEach((option) => {

    option.disabled = true;
  });

  RoomsValue[peopleAmount].forEach((seatsAmount) => {
    optionCapacityRoomElement.forEach((option) => {
      if (Number(option.value) === seatsAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

const renderRoomsNumber = () => {
  const valueRoom = Number(advertRoomNumberElement.value)
  onRoomsNumberSelect(valueRoom);
}
renderRoomsNumber();

const onChangeRoom = () => {
  renderRoomsNumber()
};
advertRoomNumberElement.addEventListener('change', onChangeRoom);


const clearForm = () => {
  advertTitleElement.value = DefaultFormOptions.title;

  timeInElement.value = DefaultFormOptions.time;
  renderTimeCheck(timeInElement, timeOutElement);

  housingTypeElement.value = DefaultFormOptions.housingType;
  renderPrice();
  clearFeature();

  advertRoomNumberElement.value = DefaultFormOptions.room;
  advertPriceInputElement.value = DefaultFormOptions.price;

  addressInputElement.value = DefaultFormOptions.address;

  getDefaultMarkerPosition();
  avatarChooserElement.value = DefaultFormOptions.choser;
  avatarPreviewElement.src = DefaultFormOptions.photoURL;

  photoChooserElement.value = DefaultFormOptions.choser;
  photoPreviewElement.src = DefaultFormOptions.photoURL;
};

const sendAdvertForm = () => {
  advertFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(
      () => {
        showSuccessMessage();
        removeMessage(successMessage);
        clearForm();
      },
      () => {
        showErrorSendDataMessage();
        removeMessage(errorMessage);
      }
      , formData)
  });
}
sendAdvertForm();

const advertResetButton = advertFormElement.querySelector('.ad-form__reset');
advertResetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearForm();
  renderRoomsNumber();
});

export { advertFormElement, mapFileterFormElement, formActive, clearForm };
