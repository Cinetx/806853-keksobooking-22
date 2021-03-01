import { sendData } from './api.js';
import { addressInput, defaultMarkerPosition } from './map.js'

const advertForm = document.querySelector('.ad-form');
const mapFileterForm = document.querySelector('.map__filters');
const timeIn = advertForm.querySelector('#timein')
const timeOut = advertForm.querySelector('#timeout')
const advertTitle = advertForm.querySelector('#title');
const housingType = advertForm.querySelector('#type');
const advertPriceInput = advertForm.querySelector('#price');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const priceType = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

// функция отключения взаимодействия в формой
const formDisabled = (form) => {
  const fromFieldset = form.querySelectorAll('fieldset');
  form.classList.add(`${form.getAttribute('class')}--disabled`);

  fromFieldset.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
};

// функция включения взаимодействия в формой
const formActive = (form) => {
  const fromFieldset = form.querySelectorAll('fieldset');
  form.classList.remove(`${form.classList[0]}--disabled`);

  fromFieldset.forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
};

formDisabled(advertForm);
formDisabled(mapFileterForm);

// функция установки 'Цены за ночь', в зависимости от выбранного типа жилья
const renderPrice = () => {
  housingType.addEventListener('change', () => {
    advertPriceInput.min = priceType[housingType.value];
    advertPriceInput.placeholder = priceType[housingType.value];
  });
}
renderPrice();

// функция синхронизации Время заезда и выезда
const renderTimeCheck = (checkIn, checkOut) => {
  checkIn.addEventListener('change', () => {
    checkOut.value = checkIn.value
  });
};

renderTimeCheck(timeIn, timeOut);
renderTimeCheck(timeOut, timeIn);

// Проверка валидности 'Заголовка объявления'
advertTitle.addEventListener('input', () => {
  const valueLength = advertTitle.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    advertTitle.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    advertTitle.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    advertTitle.setCustomValidity('');
  }
  advertTitle.reportValidity();
});

// Проверка валидности 'Цены за ночь'
advertPriceInput.addEventListener('input', () => {
  const valuePrice = Number(advertPriceInput.value);
  const priceMin = Number(advertPriceInput.min);
  const priceMax = Number(advertPriceInput.max);
  if (valuePrice < priceMin) {
    advertPriceInput.setCustomValidity(`Цена не должна быть меньше ${priceMin}`);
  }
  else if (valuePrice > priceMax) {
    advertPriceInput.setCustomValidity(`Цена не должна превышать ${priceMax}`);
  }
  else {
    advertPriceInput.setCustomValidity('');
  }
  advertPriceInput.reportValidity();
});

// синхронизация комнат
const advertRoomNumber = advertForm.querySelector('#room_number');
const advertCapacityRoom = advertForm.querySelector('#capacity');
const optionCapacityRoom = advertCapacityRoom.querySelectorAll('option')

advertRoomNumber.addEventListener('change', () => {
  optionCapacityRoom.forEach((optionItem) => {

    const valuePlaces = Number(optionItem.value);
    const valueRoom = Number(advertRoomNumber.value)

    if (valueRoom == 1 && valuePlaces != 1) {
      optionItem.setAttribute('disabled', 'disabled');

    } else if (valueRoom == 2 && valuePlaces > 2 && valuePlaces == 0) {
      optionItem.setAttribute('disabled', 'disabled');

    } else if (valueRoom == 3 && valuePlaces > 3 && valuePlaces == 0) {
      optionItem.setAttribute('disabled', 'disabled');

    } else if (valueRoom == 100 && valuePlaces > 0) {
      optionItem.setAttribute('disabled', 'disabled');

    }
  });
});

// Функция очистки формы
const clearForm = (evt)=>{
  evt.preventDefault();
  advertTitle.value = '';

  timeIn.value = '12:00';
  renderTimeCheck(timeIn, timeOut);

  housingType.value = 'flat'
  renderPrice();

  advertRoomNumber.value = '1'
  advertPriceInput.value = ''

  addressInput.value = '';

  defaultMarkerPosition();
};

advertForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(formData)

  // clearForm();
});

// Очистка формы при нажатии на кнопку
const advertResetButton = advertForm.querySelector('.ad-form__reset');
advertResetButton.addEventListener('click', (evt) => {
  clearForm(evt);
});

export { advertForm, mapFileterForm, formActive, clearForm };
