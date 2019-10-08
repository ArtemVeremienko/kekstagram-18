// preview.js - модуль для отрисовки увеличенного изображения
'use strict';

(function () {
  // Заполняю данными из первого элемента массива pictures
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');

  bigPictureElement.querySelector('.likes-count').textContent = window.picture.pictures[0].likes;
  bigPictureElement.querySelector('.comments-count').textContent = window.picture.pictures[0].comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = window.picture.pictures[0].description;

  var socialCommentsElement = bigPictureElement.querySelector('.social__comments');

  // Заполнение списка комментариев из первого элемента массива pictures
  for (var i = 0; i < window.picture.pictures[0].comments.length; i++) {
    socialCommentsElement.querySelectorAll('.social__picture')[i].src = 'img/avatar-' + window.data.randomBetweenNumbers(1, 6) + '.svg';
    socialCommentsElement.querySelectorAll('.social__text')[i].textContent = window.picture.pictures[0].comments[i];
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
    if (evt.keyCode === window.data.ESC_KEYCODE && evt.target !== window.form.hashtagsInput && evt.target !== window.form.commentsTextarea) {
      window.form.onCloseUploadClick();
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

  window.preview = {
    onPopupEscPress,
    onPictureClick
  }
})();
