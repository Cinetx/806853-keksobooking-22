const ERROR_MESSAGE_TITME = 3000;
const ErrorMessageStyle = {
  elemet: 'div',
  zIndex: 100,
  position: 'absolute',
  padding: '10px',
  left: 0,
  right: 0,
  top: 0,
  width: '100%',
  textAlign: 'center',
  backgroundColor: 'red',
  color: 'white',
  fontSize: '30px',
}

const mainContainerElement = document.querySelector('main');
const templateSuccessElement = document.querySelector('#success').content;
const successContainerElement = templateSuccessElement.cloneNode(true);
const templateErrorElement = document.querySelector('#error').content;
const errorContainerElement = templateErrorElement.cloneNode(true);
let errorMessage;
let successMessage;

const showSuccessMessage = () => {
  mainContainerElement.appendChild(successContainerElement);
  return successMessage = mainContainerElement.querySelector('.success');
};

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


const showErrorGetDataMessage = (message) => {
  const errorContainerElement = document.createElement(ErrorMessageStyle.elemet);
  errorContainerElement.style.zIndex = ErrorMessageStyle.zIndex;
  errorContainerElement.style.position = ErrorMessageStyle.position;
  errorContainerElement.style.padding = ErrorMessageStyle.padding;
  errorContainerElement.style.left = ErrorMessageStyle.left;
  errorContainerElement.style.top = ErrorMessageStyle.top;
  errorContainerElement.style.right = ErrorMessageStyle.right;
  errorContainerElement.style.width = ErrorMessageStyle.width;
  errorContainerElement.style.textAlign = ErrorMessageStyle.textAlign;
  errorContainerElement.style.backgroundColor = ErrorMessageStyle.backgroundColor;
  errorContainerElement.style.color = ErrorMessageStyle.color;
  errorContainerElement.style.fontSize = ErrorMessageStyle.fontSize;
  errorContainerElement.textContent = message;
  document.body.append(errorContainerElement);
  setTimeout(() => {
    errorContainerElement.remove();
  }, ERROR_MESSAGE_TITME);
};

const showErrorSendDataMessage = () => {
  mainContainerElement.appendChild(errorContainerElement)
  return errorMessage = mainContainerElement.querySelector('.error')
}

export { showSuccessMessage, removeMessage, showErrorGetDataMessage, showErrorSendDataMessage, successMessage, errorMessage };
