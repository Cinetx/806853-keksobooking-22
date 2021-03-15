const getRandomNumber = (min = 1, max, floatingPoint = 0) => {
  if (floatingPoint >= 1) {
    min = Math.abs(min);
    max = Math.abs(max);
    let randomNumber = (Math.random() * (max - min)) + min;
    return Number(randomNumber.toFixed(floatingPoint));
  } else {
    min = Math.round(Math.abs(min));
    max = Math.round(Math.abs(max));
    return Math.round(Math.random() * (max - min)) + min;
  }

};

const getRandom = (dataType = 1, max, floatingPoint = 0) => {

  // Получение рандомного значения объекта
  if (typeof (dataType) == 'object' && !Array.isArray(dataType)) {
    const keys = Object.keys(dataType);
    return dataType[keys[keys.length * Math.random() << 0]];
  }
  // Получение рандомного количества элементов из массива
  else if (dataType == 0 && Array.isArray(max)) {
    return max.slice(0, getRandomNumber(0, max.length));
  }

  // Получение одного рандомного элемента из массива
  else if (Array.isArray(dataType)) {
    return dataType[Math.floor(Math.random() * dataType.length)]

    // Получение рандомного числа или рандомного числа с запятой
  } else if (!Number.isNaN(dataType)) {
    return getRandomNumber(dataType, max, floatingPoint)
  }
};

/*
Пример работы функции getRandom()
getRandom(1, 10)  - получаем число
getRandom(1, 10, 2) - получаем число с двумя цифрами после запятой
getRandom(arr) - передаем массив и получаем рандомный ключ
getRandom(0, arr) - передаем число и масиив, получаем рандомное количество ключей массива
                    в первый аргумент передаем число с которого начинается отсчет массива,
                    если передадим 1, то Нулевой ключ будет пропущен и не выпадет.
getRandom(obj) - передаем объект, получаем рандомное значение, рандомного ключа объекта
*/



const setInnerText = (item, pastedText) => {
  if (pastedText == null || pastedText == undefined || pastedText == ' ') {
    item.remove;
  } else {
    return item.innerText = pastedText
  }
};

const debounceTime = 1500;
const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => { fn.apply(this, arguments) }
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
}

export { setInnerText, getRandom, debounce, debounceTime };
