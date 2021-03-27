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
const templateSuccessElement = document.querySelector('#success').content.querySelector('.success');
const templateErrorElement = document.querySelector('#error').content.querySelector('.error')

const showSuccessMessage = () => {
  const message = templateSuccessElement.cloneNode(true);
  mainContainerElement.appendChild(message);

  removeMessage(message)
};

const removeMessage = (message) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      message.remove()
    }
  }, { once: true },
  )
  document.addEventListener('click', (evt) => {
    evt.preventDefault();
    message.remove()
  }, { once: true },
  );

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
  const message = templateErrorElement.cloneNode(true);
  mainContainerElement.appendChild(message);

  removeMessage(message)
}

export { showSuccessMessage, showErrorGetDataMessage, showErrorSendDataMessage};
