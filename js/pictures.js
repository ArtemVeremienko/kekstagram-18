'use strict';

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
  pictures.push(createPicture(urlsRandom[i], MIN_LIKES, MAX_LIKES, PICTURE_COMMENTS, PICTURE_DESCRIPTIONS));
}

// Создание DOM элементов - картинки из массива в случайном порядке
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
var bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');

// Заполняю данными из первого элемента массива pictures

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

var buttonBigPictureClose = document.body.querySelector('.big-picture__cancel');
// Показываю оверлей
var onPictureClick = function (evt) {
  if (evt.target.classList.contains('picture__img')) {
    bigPictureImage.src = evt.target.src;
    bigPictureElement.classList.remove('hidden');
    document.body.removeEventListener('click', onPictureClick);
  }
};
// Открытие оверлея при клике на картинку
document.body.addEventListener('click', onPictureClick);

// Прячу оверлей
var onButtonCloseClick = function () {
  bigPictureElement.classList.add('hidden');
  document.body.addEventListener('click', onPictureClick);
};

buttonBigPictureClose.addEventListener('click', onButtonCloseClick);

// Загрузка изображения и показ формы для редактирования
var uploadImageForm = document.querySelector('#upload-select-image');
var uploadFileInput = uploadImageForm.querySelector('#upload-file');
var imageUploadOverlay = uploadImageForm.querySelector('.img-upload__overlay');
var buttonUploadClose = uploadImageForm.querySelector('.img-upload__cancel');

// При выборе файла показываю форму редактирования
uploadFileInput.addEventListener('change', function () {
  imageUploadOverlay.classList.remove('hidden');
  document.body.removeEventListener('click', onPictureClick);
});
// При нажатии на закрыть скрываю форму редактирования
buttonUploadClose.addEventListener('click', function () {
  imageUploadOverlay.classList.add('hidden');
  uploadFileInput.value = '';
  document.body.addEventListener('click', onPictureClick);
});

// Применение эффекта для изображения
var imageUploadPreview = uploadImageForm.querySelector('.img-upload__preview img');
var effectLevelPin = uploadImageForm.querySelector('.effect-level__pin');
var effectNone = uploadImageForm.querySelector('.effects__preview--none');
var effectChrome = uploadImageForm.querySelector('.effects__preview--chrome');
var effectSepia = uploadImageForm.querySelector('.effects__preview--sepia');
var effectMarvin = uploadImageForm.querySelector('.effects__preview--marvin');
var effectPhobos = uploadImageForm.querySelector('.effects__preview--phobos');
var effectHeat = uploadImageForm.querySelector('.effects__preview--heat');
var levelPin = 1;

// Добавляю обработчик события для элементов с эффектами
effectNone.addEventListener('click', function () {
  imageUploadPreview.removeAttribute('style');
});

effectChrome.addEventListener('click', function () {
  imageUploadPreview.style.WebkitFilter = 'grayscale(' + (1 * levelPin) + ')';
  imageUploadPreview.style.filter = 'grayscale(' + (1 * levelPin) + ')';
  levelPin = 1;
});

effectSepia.addEventListener('click', function () {
  imageUploadPreview.style.WebkitFilter = 'sepia(1)';
  imageUploadPreview.style.filter = 'sepia(1)';
});

effectMarvin.addEventListener('click', function () {
  imageUploadPreview.style.WebkitFilter = 'invert(1)';
  imageUploadPreview.style.filter = 'invert(1)';
});

effectPhobos.addEventListener('click', function () {
  imageUploadPreview.style.WebkitFilter = 'blur(5px)';
  imageUploadPreview.style.filter = 'blur(5px)';
});

effectHeat.addEventListener('click', function () {
  imageUploadPreview.style.WebkitFilter = 'brightness(3)';
  imageUploadPreview.style.filter = 'brightness(3)';
});


// Определяю значение слайдера
// var getSliderValue = function () {
//   var left = parseInt(getComputedStyle(effectLevelPin).left, 10);
//   return left / 100; // привожу проценты к числу
// };

// Добавляю обработчик события при mouseup
// effectLevelPin.addEventListener('mouseup', function () {
//   levelPin = 0.2;
// });
