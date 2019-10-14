// picture.js - модуль для отрисовки миниатюры
'use strict';

(function () {


  var createPicture = function (url, minLikes, maxLikes, comments, description) {

    var picture = {
      url: url,
      likes: window.data.randomBetweenNumbers(minLikes, maxLikes),
      comments: [window.data.getRandomElement(comments), window.data.getRandomElement(comments)],
      description: window.data.getRandomElement(description)
    };

    return picture;
  };

  var pictures = [];

  for (var i = 0; i < window.data.PHOTOS_MAX; i++) {
    pictures.push(createPicture(window.data.urlsRandom[i], window.data.MIN_LIKES, window.data.MAX_LIKES, window.data.PICTURE_COMMENTS, window.data.PICTURE_DESCRIPTIONS));
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

  var successHandler = function (array) {
    var fragment = document.createDocumentFragment();

    for (i = 0; i < array.length; i++) {
      fragment.appendChild(renderPicture(array[i]));
    }

    var picturesElement = document.querySelector('.pictures');
    picturesElement.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; padding: 10px 0; text-align: center; background-color: crimson';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  window.pictures = pictures;
})();
