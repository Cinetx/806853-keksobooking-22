import { sendData } from './api.js';
import { addressInput, defaultMarkerPosition } from './map.js'
import { showSuccessMessage, showErrorSendDataMessage, removeMessage, errorMessage, successMessage } from './message.js';
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

const roomValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const onRoomsNumberSelect = (peopleAmount) => {
  // Сперва отключаем все options
  optionCapacityRoom.forEach((option) => {
    option.disabled = true;
  });

  // Находим количество людей из объекта
  // Если количество людей совпадает с valu у options, то мы включаем option и выбираем ее
  roomValues[peopleAmount].forEach((seatsAmount) => {
    optionCapacityRoom.forEach((option) => {
      if (Number(option.value) === seatsAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

advertRoomNumber.addEventListener('change', () => {
  const valueRoom = Number(advertRoomNumber.value)
  // Передаем value (количесвто комнат)
  onRoomsNumberSelect(valueRoom);
});

// Функция очистки формы
const clearForm = () => {
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

const sendAdvertForm = () => {
  advertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(
      () => {
        // Показываем сообщение при удачном соеденении с сервером
        // После чего очищаем форму
        showSuccessMessage();
        removeMessage(successMessage);
        clearForm();
      },
      () => {
        // Показываем сообщение при неудачном соеденении с сервером
        // После добавляем функцию удаления сообщения
        showErrorSendDataMessage();
        removeMessage(errorMessage);
      }
      , formData)
  });
}
sendAdvertForm();

// Очистка формы при нажатии на кнопку
const advertResetButton = advertForm.querySelector('.ad-form__reset');
advertResetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearForm();
});

export { advertForm, mapFileterForm, formActive, clearForm };
