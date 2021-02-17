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

const getRandomOneArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const getRandomArray = (arr) => {
  return arr.slice(0, getRandomNumber(0, arr.length))
};

const getRandomValueObj = function (obj) {
  const keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
};

const setInnerText = (item, pastedText) => {
  if (pastedText == null || pastedText == undefined || pastedText == ' ') {
    item.remove;
  } else {
    return item.innerText = pastedText
  }
};

// функция не закончена
// const renderAdvert = () => {
//   for (let key in data) {
//     const advertDataItem = data[key];
//     const advertOffer = advertDataItem.offer;
//     let renderItem = []
//     return setInnerText(advertTitle, advertOffer.title)
//   }
// }

export { getRandomNumber, getRandomOneArray, getRandomArray, getRandomValueObj, setInnerText};
