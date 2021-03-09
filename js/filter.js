import { getFilterData } from './api.js';
import { renderMarker } from './map.js';
import { showErrorGetDataMessage } from './message.js';

const mapFilters = document.querySelector('#housing-type');

mapFilters.addEventListener('change', ()=>{
  getFilterData(renderMarker, showErrorGetDataMessage, mapFilters)
});
