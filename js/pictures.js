'use strict';

var PICTURE_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var PICTURE_DESCRIPTION = [
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

var getRandomElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
};

var createPicture = function (url, minLikes, maxLikes, comments, description) {

  var picture = {
    url: url,
    likes: randomBetweenNumbers(minLikes, maxLikes),
    comments: [getRandomElement(comments), getRandomElement(comments)],
    description: getRandomElement(description)
  };

  return picture;
};

var pictures = [];

for (i = 0; i < PHOTOS_MAX; i++) {
  pictures.push(createPicture(urlsRandom[i], MIN_LIKES, MAX_LIKES, PICTURE_COMMENTS, PICTURE_DESCRIPTION));
}

// Создание DOM элементов
var pictureTemplate = document.querySelector('#picture').content;

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var fragment = document.createDocumentFragment();

for (i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPicture(pictures[i]));
}

var picturesElement = document.querySelector('.pictures');
picturesElement.appendChild(fragment);

var bigPictureElement = document.querySelector('.big-picture');
// Показываю элемент
bigPictureElement.classList.remove('hidden');
// Заполняю данными из первого элемента массива pictures
bigPictureElement.querySelector('.big-picture__img > img').src = pictures[0].url;
bigPictureElement.querySelector('.likes-count').textContent = pictures[0].likes;
bigPictureElement.querySelector('.comments-count').textContent = pictures[0].comments.length;
bigPictureElement.querySelector('.social__caption').textContent = pictures[0].description;

var socialCommentsElement = bigPictureElement.querySelector('.social__comments');

// Заполнение списка комментариев из первого элемента массива pictures
for (i = 0; i < pictures[0].comments.length; i++) {
  socialCommentsElement.querySelectorAll('.social__picture')[i].src = 'img/avatar-' + randomBetweenNumbers(1, 6) + '.svg';
  socialCommentsElement.querySelectorAll('.social__text')[i].textContent = pictures[0].comments[i];
}

// Добавляем класс visually-hidden к первому найденому элементу
var visuallyHidden = function (classString) {
  document.querySelector(classString).classList.add('visually-hidden');
  return 'hidden';
};
// Прячу счётчик комментариев
visuallyHidden('.social__comment-count');
// и загрузку новых комментариев
visuallyHidden('.social__comments-loader');
