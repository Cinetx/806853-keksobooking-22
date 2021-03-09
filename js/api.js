const NUMBERS_OF_ADVERTS = 10;






const getData = (onSuccess, onError) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      // Если с сервером все нормально, возврашаем response.json
      if (response.ok) {
        return response.json()
      }
      // Если серверу плохо создаем объект Error и обрабатываем его в .catch
      throw new Error('Ошибка')
    })
    .then((data) => {
      // Обрезаем данные до NUMBERS_OF_ADVERTS
      onSuccess(data.slice(0, NUMBERS_OF_ADVERTS));
    })
    .catch((err) => {
      onError(err)
    })
};


const filterData = (data, input) => {
  let filterAdvert = [];
  data.forEach((advert) => {
    if (input.value == advert.offer.type) {
      filterAdvert.push(advert)
    } else if (input.value == 'any') {
      filterAdvert.push(advert)
    }
  });
  return filterAdvert
};

const getFilterData = (onSuccess, onError, input) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      // Если с сервером все нормально, возврашаем response.json
      if (response.ok) {
        return response.json()
      }
      // Если серверу плохо создаем объект Error и обрабатываем его в .catch
      throw new Error('Ошибка')
    })
    .then((data) => {
      // Филтруем полученныне Data в соответствие с input
      // Обрезаем данные до NUMBERS_OF_ADVERTS
      onSuccess(filterData(data, input).slice(0, NUMBERS_OF_ADVERTS));
    })
    .catch((err) => {
      onError(err)
    })
};



const sendData = (onSuccess, onError, data) => {
  fetch('https://22.javascript.pages.academy/keksobooking', {
    method: 'POST',

    body: data,
  }).then((response) => {
    if (response.ok) {
      // Сообщение при успехе
      onSuccess();
    } else {
      onError('Ошибка');
    }
  }).catch((err) => {
    // Сообщение при ошибке
    onError(err);
  })
};

export { getData, sendData, getFilterData };
