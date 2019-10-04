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
var ESC_KEYCODE = 27;
var MAX_HASHTAGS_COUNT = 5;
var MAX_HASHTAGS_LENGTH = 19;

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

// При нажатии на ESC происходит закрытие диалога загрузки
// если не вводим хештег или комментарий
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== hashtagsInput && evt.target !== commentsTextarea) {
    onCloseUploadClick();
    onButtonCloseClick();
  }
};

var buttonBigPictureClose = document.body.querySelector('.big-picture__cancel');
// Показываю оверлей
var onPictureClick = function (evt) {
  if (evt.target.classList.contains('picture__img')) {
    bigPictureImage.src = evt.target.src;
    bigPictureElement.classList.remove('hidden');
    document.body.removeEventListener('click', onPictureClick);
    document.addEventListener('keydown', onPopupEscPress);
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
var hashtagsInput = uploadImageForm.querySelector('.text__hashtags');
var commentsTextarea = uploadImageForm.querySelector('.text__description');

var onUploadClick = function () {
  imageUploadOverlay.classList.remove('hidden');
  document.body.removeEventListener('click', onPictureClick);
  document.addEventListener('keydown', onPopupEscPress);
};

var onCloseUploadClick = function () {
  imageUploadOverlay.classList.add('hidden');
  uploadFileInput.value = '';
  document.removeEventListener('keydown', onPopupEscPress);
  document.body.addEventListener('click', onPictureClick);
};

// При выборе файла показываю форму редактирования
uploadFileInput.addEventListener('change', onUploadClick);

// При нажатии на закрыть скрываю форму редактирования
buttonUploadClose.addEventListener('click', onCloseUploadClick);

// Применение эффекта для изображения
var imageUploadPreview = uploadImageForm.querySelector('.img-upload__preview img');
// var effectLevelPin = uploadImageForm.querySelector('.effect-level__pin');
var effectNone = uploadImageForm.querySelector('.effects__preview--none');
var effectChrome = uploadImageForm.querySelector('.effects__preview--chrome');
var effectSepia = uploadImageForm.querySelector('.effects__preview--sepia');
var effectMarvin = uploadImageForm.querySelector('.effects__preview--marvin');
var effectPhobos = uploadImageForm.querySelector('.effects__preview--phobos');
var effectHeat = uploadImageForm.querySelector('.effects__preview--heat');
var imageUploadEffect = uploadImageForm.querySelector('.effect-level');
var effectLevelLine = uploadImageForm.querySelector('.effect-level__line');
var effectLevelPin = uploadImageForm.querySelector('.effect-level__pin');
var effectLevelDepth = uploadImageForm.querySelector('.effect-level__depth');
var effectLevelInput = uploadImageForm.querySelector('.effect-level__value');

var removeAllClasses = function () {
  imageUploadPreview.className = '';
  imageUploadPreview.removeAttribute('style');
  effectLevelPin.removeAttribute('style');
  effectLevelDepth.removeAttribute('style');
};

// Добавляю обработчик события для элементов с эффектами
effectNone.addEventListener('click', function () {
  removeAllClasses();
  imageUploadEffect.classList.add('hidden');
});

effectChrome.addEventListener('click', function () {
  removeAllClasses();
  imageUploadPreview.classList.add('effects__preview--chrome');
  imageUploadEffect.classList.remove('hidden');
});

effectSepia.addEventListener('click', function () {
  removeAllClasses();
  imageUploadPreview.classList.add('effects__preview--sepia');
  imageUploadEffect.classList.remove('hidden');
});

effectMarvin.addEventListener('click', function () {
  removeAllClasses();
  imageUploadPreview.classList.add('effects__preview--marvin');
  imageUploadEffect.classList.remove('hidden');
});

effectPhobos.addEventListener('click', function () {
  removeAllClasses();
  imageUploadPreview.classList.add('effects__preview--phobos');
  imageUploadEffect.classList.remove('hidden');
});

effectHeat.addEventListener('click', function () {
  removeAllClasses();
  imageUploadPreview.classList.add('effects__preview--heat');
  imageUploadEffect.classList.remove('hidden');
});


// Валидация хеш-тегов
// 1. Должны начинаться со символа '#'
// 2. Разделяются пробелами
// 3. Один и тот же хеш-тег не может использоваться дважды
// 4. Нельзя указать больше 5 хеш-тегов
// 5. Максимальная длина 20 символов, включая #
// 6. Нечуствительны к регистру
var hashtags = [];

var isHashtag = function (array) {
  for (i = 0; i < array.length; i++) {
    if (!array[i].startsWith('#')) {
      return false;
    }
  }
  return true;
};

var isHashtagInside = function (array) {
  for (i = 0; i < array.length; i++) {
    if (array[i].includes('#', 1)) {
      return true;
    }
  }
  return false;
};

var checkHashtagLength = function (array, maxLength) {
  for (i = 0; i < array.length; i++) {
    if (array[i].length < 2 || array[i].length > maxLength) {
      return false;
    }
  }
  return true;
};

// https://stackoverflow.com/questions/7376598/in-javascript-how-do-i-check-if-an-array-has-duplicate-values
// Проверка массива хеш-тегов на дубликаты
var hasDuplicate = function (array) {
  // eslint-disable-next-line no-undef
  return (new Set(array)).size !== array.length;
};

hashtagsInput.addEventListener('input', function (evt) {
  hashtags = evt.target.value.toLowerCase().split(' ');

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    hashtagsInput.setCustomValidity('Нельзя указывать больше 5 хеш-тегов');
  } else if (!isHashtag(hashtags)) {
    hashtagsInput.setCustomValidity('Хеш-тег должен начинаться со символа "#" ');
  } else if (isHashtagInside(hashtags)) {
    hashtagsInput.setCustomValidity('Хеш-теги должны разделятся пробелами: "#первый #второй" ');
  } else if (!checkHashtagLength(hashtags, MAX_HASHTAGS_LENGTH)) {
    hashtagsInput.setCustomValidity('Длина хеш-тега должна быть от 1 до 19 символов');
  } else if (hasDuplicate(hashtags)) {
    hashtagsInput.setCustomValidity('Один и тот же хеш-тег не может использоваться дважды');
  } else {
    hashtagsInput.setCustomValidity('');
  }
});

// Слайдер задающий глубину эффектов


effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoord = evt.clientX;
  var sliderWidth = effectLevelLine.getBoundingClientRect().width;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    //  485 - 100%
    // shift  -  ?

    var shift = startCoord - moveEvt.clientX;
    var newLeft = (effectLevelPin.offsetLeft - shift) / sliderWidth * 100; // Перевожу в проценты
    if (newLeft < 0) {
      newLeft = 0;
    } else if (newLeft > 100) {
      newLeft = 100;
    }

    startCoord = moveEvt.clientX;

    effectLevelPin.style.left = newLeft + '%';
    effectLevelDepth.style.width = newLeft + '%';
    effectLevelInput.value = Math.round(newLeft);

    // Применяю уровень фильтра согласно значения слайдера
    if (imageUploadPreview.classList.contains('effects__preview--chrome')) {
      imageUploadPreview.style.filter = 'grayscale(' + (newLeft / 100) + ')';
    } else if (imageUploadPreview.classList.contains('effects__preview--sepia')) {
      imageUploadPreview.style.filter = 'sepia(' + (newLeft / 100) + ')';
    } else if (imageUploadPreview.classList.contains('effects__preview--marvin')) {
      imageUploadPreview.style.filter = 'invert(' + newLeft + '%)';
    } else if (imageUploadPreview.classList.contains('effects__preview--phobos')) {
      imageUploadPreview.style.filter = 'blur(' + (newLeft / 100 * 3) + 'px)';
    } else if (imageUploadPreview.classList.contains('effects__preview--heat')) {
      imageUploadPreview.style.filter = 'brightness(' + (1 + newLeft / 100 * 2) + ')';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
