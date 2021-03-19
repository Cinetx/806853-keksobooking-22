import { renderMarker } from './map.js';
import { debounce, debounceTime } from './util.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');

const HousingPrice = {
  low: 10000,
  high: 50000,
}

const checkType = (advert) => {
  return housingType.value == 'any' ? true : housingType.value == advert.offer.type;
}

const checkPrice = (advert) => {
  switch (housingPrice.value) {
    case 'any':
      return true;
    case 'low':
      return advert.offer.price < HousingPrice.low;
    case 'middle':
      return advert.offer.price >= HousingPrice.low && advert.offer.price < HousingPrice.high;
    case 'high':
      return advert.offer.price >= HousingPrice.high;
    default:
      return false;
  }
};

const checkRooms = (advert) => {
  return housingRooms.value == 'any' ? true : housingRooms.value == advert.offer.rooms;
}

const checkGuests = (advert) => {
  return housingGuests.value == 'any' ? true : housingGuests.value == advert.offer.guests;
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
  return data.filter((advert) => {
    return (
      checkType(advert) &&
      checkGuests(advert) &&
      checkRooms(advert) &&
      checkPrice(advert) &&
      checkFeatures(advert)
    )
  })
};

// Рендер при изменении фильтра
let setFilterChange = (data) => {
  const filteredAdverts = getFilteredAdvert(data);
  renderMarker(filteredAdverts);
  onFilterChange(data);
};

// Действие при выборе фильтра
const onFilterChange = (data) => {
  mapFilters.addEventListener('change', () => {
    setFilterChange = debounce(onFilterChange, debounceTime);
    onFilterChange(data);
    const filteredAdverts = getFilteredAdvert(data);
    renderMarker(filteredAdverts);
  })
};

export { getFilteredAdvert, setFilterChange, onFilterChange };
