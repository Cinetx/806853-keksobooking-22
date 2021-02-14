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

export {getRandomNumber, getRandomOneArray, getRandomArray};
