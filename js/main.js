'use strict'

const getRandomNumber = function(min, max) {
  min = Math.round(Math.abs(min));
  max = Math.round(Math.abs(max));
  return Math.round(Math.random() * (max - min)) + min;
};
getRandomNumber(0, 10);
getRandomNumber(-1, 10);
getRandomNumber(-10, 0);

const getFloatingRandomNumber = function(min, max, floatingPoint) {
  min = Math.abs(min);
  max = Math.abs(max);
  let randomNumber = (Math.random() * (max - min)) + min;
  return randomNumber.toFixed(floatingPoint);
};
getFloatingRandomNumber(2.2, 1.1, 1);
getFloatingRandomNumber(-1.2, 2.1, 1);
getFloatingRandomNumber(1, 10, 4);
