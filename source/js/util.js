const DEBOUNCE_TIME = 500;

const setInnerText = (item, pastedText) => {
  if (pastedText === null || pastedText === undefined || pastedText === ' ') {
    item.remove;
  } else {
    return item.innerText = pastedText
  }
};

const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};


export { setInnerText, debounce, DEBOUNCE_TIME };

