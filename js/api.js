import {showErrorGetDataMessage, showSuccessMessage, showErrorSendDataMessage, removeMessage, errorMessage} from './message.js';
// import { clearForm } from './from.js';
const getData = (renderItem) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      // Если с сервером все нормально, возврашаем response.json
      if (response.ok) {
        return response.json()
      }
      // Если серверу плохо создаем объект Error и обрабатываем его в .catch
      throw new Error ('Ошибка')
    })
    .then((data) => {
      renderItem(data)
    })
    .catch((err)=>{
      showErrorGetDataMessage(err)
    })
};

const sendData = (data, clearForm) => {
  fetch('https://22.javascript.pages.academy/keksobooking', {
    method: 'POST',
    headers: {
      // Тип передачи
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  }).then((response)=>{
    if (response.ok) {
      // Сообщение при успехе
      showSuccessMessage();
      // Функция очистки при успехе
      clearForm();
    }
    throw new Error ('Ошибка')
  }).catch(()=>{
    // Сообщение при ошибке
    showErrorSendDataMessage();
    removeMessage(errorMessage);
  })
};

export {getData, sendData};
