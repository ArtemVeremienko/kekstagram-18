'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  window.backend = {};

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend.load = load; // экспортирую функция для получения данных с сервера
})();

(function () {
  var URL = 'https://js.dump.academy/kekstagram';

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа сервера: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend.upload = upload; // экспортирую функцию для оправки данных на сервер
})();
