import { renderMarker } from './map.js';
import { debounce, DEBOUNCE_TIME } from './util.js';

const HousingPrices = {
  low: 10000,
  high: 50000,
}

const mapFiltersElemet = document.querySelector('.map__filters');
const housingTypeElemet = mapFiltersElemet.querySelector('#housing-type');
const housingPriceElemet = mapFiltersElemet.querySelector('#housing-price');
const housingRoomsElemet = mapFiltersElemet.querySelector('#housing-rooms');
const housingGuestsElemet = mapFiltersElemet.querySelector('#housing-guests');



const checkType = (advert) => {
  return housingTypeElemet.value === 'any' ? true : housingTypeElemet.value === advert.offer.type;
}

const checkPrice = (advert) => {
  switch (housingPriceElemet.value) {
    case 'any':
      return true;
    case 'low':
      return advert.offer.price < HousingPrices.low;
    case 'middle':
      return advert.offer.price >= HousingPrices.low && advert.offer.price < HousingPrices.high;
    case 'high':
      return advert.offer.price >= HousingPrices.high;
    default:
      return false;
  }
};

const checkRooms = (advert) => {
  return housingRoomsElemet.value === 'any' ? true : housingRoomsElemet.value === advert.offer.rooms;
}

const checkGuests = (advert) => {
  return housingGuestsElemet.value === 'any' ? true : housingGuestsElemet.value === advert.offer.guests;
}

const checkFeatures = (advert) => {
  const checkedFeatures = mapFiltersElemet.querySelectorAll('.map__checkbox:checked');
  let count = 0;
  checkedFeatures.forEach((feature) => {
    if (advert.offer.features.includes(feature.value))
      count++;
  })

  return count === checkedFeatures.length;
}

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

const setFilterChange = (data) => {
  const filteredAdverts = getFilteredAdvert(data);
  renderMarker(filteredAdverts);
  mapFiltersElemet.addEventListener('change', () => {
    debounceOnFilterChange(data);
  })
};

const onFilterChange = (data) => {
  const filteredAdverts = getFilteredAdvert(data);
  renderMarker(filteredAdverts);
};

const debounceOnFilterChange = debounce((data) => {
  onFilterChange(data)
}, DEBOUNCE_TIME);

export { setFilterChange };
