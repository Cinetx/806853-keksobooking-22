import { renderMarker } from './map.js';
import { debounce, debounceTime } from './util.js';

const mapFilters = document.querySelector('.map__filters');

const checkType = (advert) => {
  const housingType = mapFilters.querySelector('#housing-type');
  if (housingType.value == advert.offer.type) {
    return true
  } else if (housingType.value == 'any') {
    return true
  }
}

const HousingPrice = {
  low: 10000,
  high: 50000,
}

const checkPrice = (advert) => {
  const housingPrice = mapFilters.querySelector('#housing-price');
  if (housingPrice.value == 'any') {
    return true
  } else if (
    housingPrice.value == 'low' &&
    advert.offer.price <= HousingPrice.low) {
    return true
  } else if (
    housingPrice.value == 'high' &&
    advert.offer.price >= HousingPrice.high) {
    return true
  } else if (
    housingPrice.value == 'middle' &&
    advert.offer.price >= HousingPrice.low &&
    advert.offer.price <= HousingPrice.high) {
    return true
  }
}


const checkRooms = (advert) => {
  const housingRooms = mapFilters.querySelector('#housing-rooms');
  if (housingRooms.value == advert.offer.rooms) {
    return true
  } else if (housingRooms.value == 'any') {
    return true
  }
}

const checkGuests = (advert) => {
  const housingGuests = mapFilters.querySelector('#housing-guests');
  if (housingGuests.value == advert.offer.guests) {
    return true
  } else if (housingGuests.value == 'any') {
    return true
  }
}

const checkFeatures = (advert) => {
  const checkedFeatures = mapFilters.querySelectorAll('.map__checkbox:checked');
  let count = 0;

  checkedFeatures.forEach((feature) => {
    if (advert.offer.features.includes(feature.value))
      count++;
  })
  return count === checkedFeatures.length;
}


// Получаем фильтруемые данные
const getFilteredAdvert = (data) => {
  const filteredAdvert = data.filter((advert) => {
    return (
      checkType(advert) &&
      checkGuests(advert) &&
      checkRooms(advert) &&
      checkPrice(advert) &&
      checkFeatures(advert)
    )
  })
  return filteredAdvert;
};

// Рендер при изменении фильтра
let onFilterChange = (data) => {
  const filteredAdverts = getFilteredAdvert(data);
  renderMarker(filteredAdverts);
};

// Действие при выборе фильтра
const setFilterChange = (data) => {
  mapFilters.addEventListener('change', () => {
    onFilterChange = debounce(onFilterChange, debounceTime);
    onFilterChange(data);
  })
};

export { getFilteredAdvert, setFilterChange, onFilterChange };
