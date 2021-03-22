import { getData } from './api.js';
import { setFilterChange } from './filter.js';
import { showErrorGetDataMessage } from './message.js';

const NUMBERS_OF_ADVERTS = 10;

// Рендер объявлений
getData((data) => {
  const advertToRender = data.slice(0, NUMBERS_OF_ADVERTS);
  setFilterChange(advertToRender);
}, showErrorGetDataMessage);
