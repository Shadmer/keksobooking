"use strict";

(function () {
    var ENTER_KEYCODE = 13;
    var ESC_KEYCODE = 27;
    var map = document.querySelector(".map");
    var mapPins = document.querySelector(".map__pins");
    var pinMain = document.querySelector('.map__pin--main');
    var noticeForm = document.querySelector('.notice__form');
    var fieldsets = noticeForm.querySelectorAll('fieldset');
    var selectedPin = null;
    var selectedCard = null;
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
    var openMap = function () {
        map.classList.remove("map--faded");
        mapPins.appendChild(pinFragment);
        noticeForm.classList.remove('notice__form--disabled');
        for (var i = 0; i < fieldsets.length; i++) {
            fieldsets[i].removeAttribute('disabled');
        }
    };
    var onPinClick = function (node) {
        if (selectedPin) {
            selectedPin.classList.remove('map__pin--active');
        }
        selectedPin = node;
        selectedPin.classList.add('map__pin--active');

        if (selectedCard) {
            selectedCard.remove();
        }

        selectedCard = card.cardItem;
        map.appendChild(selectedCard);
    };
    var onCloseClick = function () {
        selectedPin.classList.remove('map__pin--active');
        selectedCard.remove();
        selectedCard = null;
        document.removeEventListener('keydown', onPopupEsc);
    };
    var onPopupEsc = function (e) {
        if (e.keyCode === ESC_KEYCODE) {
            onCloseClick();
        }
    };
    pinMain.addEventListener('mouseup', openMap);
    map.addEventListener('click', function (e) {
        var target = e.target;
        while (target !== map) {
            if (target.classList.contains('map__pin') && !target.classList.contains('map__pin--main')) {
                onPinClick(target);
                document.addEventListener('keydown', onPopupEsc);
                return;
            }
            if (target.classList.contains('popup__close')) {
                onCloseClick();
                return;
            }
            target = target.parentNode;
        }
    });
})();