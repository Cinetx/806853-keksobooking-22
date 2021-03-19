const setInnerText = (item, pastedText) => {
  if (pastedText == null || pastedText == undefined || pastedText == ' ') {
    item.remove;
  } else {
    return item.innerText = pastedText
  }
};

const debounceTime = 500;
const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => { fn.apply(this, arguments) }
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
}

export { setInnerText, debounce, debounceTime };
