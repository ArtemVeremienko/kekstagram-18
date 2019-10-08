// data.js - модуль, который создаёт данные
'use strict';

(function () {
  var PICTURE_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var PICTURE_DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  var PHOTOS_MAX = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var ESC_KEYCODE = 27;

  // Случайное целое число от min до max
  // https://learn.javascript.ru/number#sluchaynoe-tseloe-chislo-ot-min-do-max
  var randomBetweenNumbers = function (min, max) {
    var random = Math.floor(Math.random() * (max - min + 1) + min);
    return random;
  };

  // Создание массива адресов фото по порядку
  var urls = [];

  for (var i = 0; i < PHOTOS_MAX; i++) {
    urls.push('photos/' + (i + 1) + '.jpg');
  }

  // Перемешивание массива
  var permutationArray = function (array) {
    var randomArray = [];
    var randomNumber = 0;
    var arrayLength = array.length;

    while (arrayLength--) {
      randomNumber = Math.floor(Math.random() * (arrayLength + 1));
      randomArray.push(array[randomNumber]);
      array.splice(randomNumber, 1);
    }

    return randomArray;
  };

  var urlsRandom = permutationArray(urls);

  // Получаем случайный элемент из массива
  var getRandomElement = function (array) {
    var randomElement = Math.floor(Math.random() * array.length);
    return array[randomElement];
  };

  // Экспорт данных в глобальную область видимости
  window.data = {
    PICTURE_COMMENTS,
    PICTURE_DESCRIPTIONS,
    PHOTOS_MAX,
    MIN_LIKES,
    MAX_LIKES,
    ESC_KEYCODE,
    urlsRandom,
    randomBetweenNumbers,
    getRandomElement
  }
})();
