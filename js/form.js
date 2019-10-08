// form.js - модуль, который работает с формой редактирования изображения
'use strict';

(function () {
  var MAX_HASHTAGS_COUNT = 5;
  var MAX_HASHTAGS_LENGTH = 19;
  // Загрузка изображения и показ формы для редактирования
  var uploadImageForm = document.querySelector('#upload-select-image');
  var uploadFileInput = uploadImageForm.querySelector('#upload-file');
  var imageUploadOverlay = uploadImageForm.querySelector('.img-upload__overlay');
  var buttonUploadClose = uploadImageForm.querySelector('.img-upload__cancel');
  var hashtagsInput = uploadImageForm.querySelector('.text__hashtags');
  var commentsTextarea = uploadImageForm.querySelector('.text__description');

  var onUploadClick = function () {
    imageUploadOverlay.classList.remove('hidden');
    document.body.removeEventListener('click', window.preview.onPictureClick);
    document.addEventListener('keydown', window.preview.onPopupEscPress);
  };

  var onCloseUploadClick = function () {
    imageUploadOverlay.classList.add('hidden');
    uploadFileInput.value = '';
    document.removeEventListener('keydown', window.preview.onPopupEscPress);
    document.body.addEventListener('click', window.preview.onPictureClick);
    removeAllClasses();
    imageUploadEffect.classList.add('hidden');
  };

  // При выборе файла показываю форму редактирования
  uploadFileInput.addEventListener('change', onUploadClick);

  // При нажатии на закрыть скрываю форму редактирования
  buttonUploadClose.addEventListener('click', onCloseUploadClick);

  // Применение эффекта для изображения
  var imageUploadPreview = uploadImageForm.querySelector('.img-upload__preview img');
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
    for (var i = 0; i < array.length; i++) {
      if (!array[i].startsWith('#')) {
        return false;
      }
    }
    return true;
  };

  var isHashtagInside = function (array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].includes('#', 1)) {
        return true;
      }
    }
    return false;
  };

  var checkHashtagLength = function (array, maxLength) {
    for (var i = 0; i < array.length; i++) {
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

      //  453 - 100%
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

  window.form = {
    hashtagsInput,
    commentsTextarea,
    onCloseUploadClick
  };
})();
