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
      onSuccess(data);
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

export { getData, sendData };
