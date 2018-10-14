// Модуль отрисовки и взаимодействия с пином

"use strict";

(function () {
    var pinTemplate = document.querySelector('template')
        .content
        .querySelector('.map__pin');
    var renderPin = function (pin) {
        var pinItem = pinTemplate.cloneNode(true);
        pinItem.style.left = pin.location.x + 20 + 'px';
        pinItem.style.top = pin.location.y + 40 + 'px';
        pinItem.querySelector('img').src = pin.author.avatar;
        return pinItem;
    };
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < data.ads.length; i++) {
        pinFragment.appendChild(renderPin(data.ads[i]));
    }

    window.pin = {
        pinItems: pinFragment
    };
})();