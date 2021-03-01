
const mainContainer = document.querySelector('main');
const ERROR_MESSAGE_TITME = 3000;

// Функция показа сообщения об отправки
const templateSuccess = document.querySelector('#success').content;
const successContainer = templateSuccess.cloneNode(true);
let successMessage;
const showSuccessMessage = () => {
  mainContainer.appendChild(successContainer);
  return successMessage = mainContainer.querySelector('.success');
};

// Функция удаления всплывающих сообщений
const removeMessage = (message) => {
  document.addEventListener('keydown', (evt) => {

    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      message.remove()
    }
  });
  document.addEventListener('click', (evt) => {
    evt.preventDefault();
    message.remove()
  });
}

// Функция показа сообщения об ошибки
const showErrorGetDataMessage = (message) => {
  const errorContainer = document.createElement('div')
  errorContainer.style.zIndex = 100;
  errorContainer.style.position = 'absolute';
  errorContainer.style.padding = '10px'
  errorContainer.style.left = 0;
  errorContainer.style.top = 0;
  errorContainer.style.right = 0;
  errorContainer.style.width = '100%';
  errorContainer.style.textAlign = 'center'
  errorContainer.style.backgroundColor = 'red'
  errorContainer.style.color = 'white'
  errorContainer.style.fontSize = '30px';
  errorContainer.textContent = message;
  document.body.append(errorContainer);
  setTimeout(() => {
    errorContainer.remove();
  }, ERROR_MESSAGE_TITME);
};


const templateError = document.querySelector('#error').content;
const errorContainer = templateError.cloneNode(true);
let errorMessage;
const showErrorSendDataMessage = ()=> {
  mainContainer.appendChild(errorContainer)
  return errorMessage = mainContainer.querySelector('.error')
}

export { showSuccessMessage, removeMessage, showErrorGetDataMessage, showErrorSendDataMessage, successMessage, errorMessage };
