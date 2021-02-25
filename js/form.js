const advertForm = document.querySelector('.ad-form');
const mapFileterForm = document.querySelector('.map__filters');


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

formDisabled(advertForm);
formDisabled(mapFileterForm);


const PRICE_BUNGALOW = 0;
const PRICE_FLAT = 1000;
const PRICE_HOUSE = 5000;
const PRICE_PALACE = 10000;

const housingType = advertForm.querySelector('#type');
const advertPrice = advertForm.querySelector('#price');
const renderPrice = () => {
  housingType.addEventListener('change', () => {
    if (housingType.value == 'bungalow') {
      advertPrice.min = PRICE_BUNGALOW;
      advertPrice.placeholder = PRICE_BUNGALOW;
    } else if (housingType.value == 'flat') {
      advertPrice.min = PRICE_FLAT;
      advertPrice.placeholder = PRICE_FLAT;
    } else if (housingType.value == 'house') {
      advertPrice.min = PRICE_HOUSE;
      advertPrice.placeholder = PRICE_HOUSE;
    } else if (housingType.value == 'palace') {
      advertPrice.min = PRICE_PALACE;
      advertPrice.placeholder = PRICE_PALACE;
    }
  });
}
renderPrice();

const timeIn = advertForm.querySelector('#timein')
const timeOut = advertForm.querySelector('#timeout')

const renderTimeCheck = (checkIn, checkOut) => {
  checkIn.addEventListener('change', () => {
    checkOut.value = checkIn.value
  });
};

renderTimeCheck(timeIn, timeOut);
renderTimeCheck(timeOut, timeIn);

const advertTitle = advertForm.querySelector('#title');


const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

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

advertPrice.addEventListener('input', () => {
  const valuePrice = advertPrice.value;
  const priceMin = advertPrice.min;
  const priceMax = advertPrice.max;

  if (valuePrice < priceMin) {
    advertPrice.setCustomValidity(`Цена не должна быть меньше ${priceMin}`);
  } else if (valuePrice > priceMax) {
    advertPrice.setCustomValidity(`Цена не должна превышать ${priceMax}`);
  } else {
    advertPrice.setCustomValidity('');
  }
  advertPrice.reportValidity();
});

// const advertRoomNumber = advertForm.querySelector('#room_number');
// const advertCapacityRoom = advertForm.querySelector('#capacity');
// const optionCapacityRoom = advertCapacityRoom.querySelectorAll('option')

// advertRoomNumber.addEventListener('change', ()=>{
//   optionCapacityRoom.forEach((optionItem)=>{
//     console.log(optionItem.value)
//     if (advertRoomNumber.value == 1 && optionItem.value != 1) {
//       optionItem.setAttribute('disabled', 'disabled')
//     } else if (advertRoomNumber.value == 2 && optionItem.value > 2) {
//       optionItem.setAttribute('disabled', 'disabled')
//     }
//   });

// });

// 3.6. Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом,
//  что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:
// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей».
/*
Пропишите тегу <form> правильные значения атрибутов method и адрес action для отправки формы на сервер.

2.3. После заполнения всех данных, при нажатии на кнопку «Опубликовать»,
все данные из формы, включая изображения,
 с помощью AJAX-запроса отправляются на сервер https://22.javascript.pages.academy/keksobooking
 методом POST с типом multipart/form-data.

Обратите внимание. В разделе про работу с сетью мы доработаем механизм отправки данных,
 а пока достаточно правильных атрибутов у тега <form>.

Если форма заполнена верно, то после отправки покажется страница сервера
(по адресу из атрибута action тега form) с успешно отправленными данными.
 Если же форма пропустила какие-то некорректные значения,
  то будет показана страница с допущенными ошибками.
   В идеале у пользователя не должно быть сценария,
    при котором он может отправить некорректную форму.


Напишите код для валидации формы добавления изображения. Список полей для валидации:
Количество комнат и количество мест


Обратите внимание, что код для синхронизации полей «Время заезда» и «Время выезда» у вас уже написан
 и относится к валидации косвенно.
 Аналогично с полем «Тип жилья» — выбор его опции влияет только на валидацию поля «Цена за ночь».

Реализуйте логику проверки так,
чтобы, как минимум, она срабатывала при попытке отправить форму и не давала этого сделать,
 если форма заполнена не по правилам.
При желании, реализуйте проверки сразу при вводе значения в поле.

2.4. Страница реагирует на неправильно введённые значения в форму.
Если данные, введённые в форму, не соответствуют ограничениям, указанным в разделе,
описывающем поля ввода, форму невозможно отправить на сервер.
При попытке отправить форму с неправильными данными, отправки не происходит,
 а неверно заполненные поля подсвечиваются красной рамкой. С
 пособ добавления рамки и её стиль произвольные

Непростая валидация?
Поля, не перечисленные в техзадании, но существующие в разметке, особой валидации не требуют.
*/

export { advertForm, mapFileterForm, formActive };
