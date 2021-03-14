import { getData} from './api.js';
import { setFilterChange, onFilterChange } from './filter.js';
import { showErrorGetDataMessage } from './message.js';

const NUMBERS_OF_ADVERTS = 10;
// Рендер объявлений
getData((data) => {
  let advertToRender = data.slice(0, NUMBERS_OF_ADVERTS);

  setFilterChange(advertToRender);
  onFilterChange(advertToRender);
}, showErrorGetDataMessage);

