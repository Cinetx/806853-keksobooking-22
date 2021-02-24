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
const priceInput = advertForm.querySelector('#price');
const renderPrice = () => {
  housingType.addEventListener('change', () => {
    if (housingType.value == 'bungalow') {
      priceInput.min = PRICE_BUNGALOW;
      priceInput.placeholder = PRICE_BUNGALOW;
    } else if (housingType.value == 'flat') {
      priceInput.min = PRICE_FLAT;
      priceInput.placeholder = PRICE_FLAT;
    } else if (housingType.value == 'house') {
      priceInput.min = PRICE_HOUSE;
      priceInput.placeholder = PRICE_HOUSE;
    } else if (housingType.value == 'palace') {
      priceInput.min = PRICE_PALACE;
      priceInput.placeholder = PRICE_PALACE;
    }
  });
}
renderPrice();

const timeIn = advertForm.querySelector('#timein')
const timeOut = advertForm.querySelector('#timeout')

const renderTimeCheck = () => {
  timeIn.addEventListener('change', ()=>{
    timeOut.value = timeIn.value
  });
};
renderTimeCheck()

export { advertForm, mapFileterForm, formActive };
