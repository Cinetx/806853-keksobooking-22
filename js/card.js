import { getData} from './api.js';
import { renderMarker } from './map.js';
import { showErrorGetDataMessage } from './message.js';


// Рендер объявлений
getData(renderMarker, showErrorGetDataMessage);
