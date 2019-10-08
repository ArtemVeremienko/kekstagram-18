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

  var fragment = document.createDocumentFragment();

  for (i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }

  var picturesElement = document.querySelector('.pictures');
  picturesElement.appendChild(fragment);

  window.picture = {
    pictures
  };
})();
