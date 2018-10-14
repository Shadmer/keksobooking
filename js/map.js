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
    var openMap = function (e) {
        e.preventDefault();
        map.classList.remove("map--faded");
        mapPins.appendChild(pin.pinItems);
        noticeForm.classList.remove('notice__form--disabled');
        for (var i = 0; i < fieldsets.length; i++) {
            fieldsets[i].removeAttribute('disabled');
        }
    };


    var pinMove1 = function (e) {
        e.preventDefault();
        var address = document.querySelector('#address');
        var startCoords = {
            x: e.pageX,
            y: e.pageY
        };
        var onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();
            var shift = {
                x: moveEvt.pageX - startCoords.x,
                y: moveEvt.pageY - startCoords.y
            };

            startCoords = {
                x: moveEvt.pageX,
                y: moveEvt.pageY
            };

            if(pinMain.offsetLeft < 20) {
                pinMain.style.left = '20px';
            }

            if(pinMain.offsetLeft > mapPins.offsetWidth - 20) {
                pinMain.style.left = mapPins.offsetWidth - 20 + 'px';
            }

            if(pinMain.offsetTop < 100) {
                pinMain.style.top = '100px';

            }

            if(pinMain.offsetTop > 700) {
                pinMain.style.top = 700 + 'px';
            }

            // Возможные замены
            // if(pinMain.offsetTop < 0) {
            //     pinMain.style.top = '0px';
            //
            // }
            //
            // if(pinMain.offsetTop > mapPins.offsetHeight) {
            //     pinMain.style.top = mapPins.offsetHeight + 'px';
            // }

            // if(startCoords.x < 300) {
            //     pinMain.style.left = '0px';
            // }
            //
            // if(startCoords.x > 1400) {
            //     pinMain.style.left = '99%';
            // }
            //
            // if(startCoords.y < 100) {
            //     pinMain.style.top = '100px';
            // }
            //
            // if(startCoords.y > 500) {
            //     pinMain.style.top = '500px';
            // }

            pinMain.style.top = (pinMain.offsetTop + shift.y) + 'px';
            pinMain.style.left = (pinMain.offsetLeft + shift.x) + 'px';
            address.value = 'x: ' + (startCoords.x) + ', y: ' + (startCoords.y);
        };
        var onMouseUp = function (upEvt) {
            upEvt.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };
    var pinMove2 = function (e) {
        e.preventDefault();
        var onMouseMove = function (moveEvt){
            pinMain.style.top = moveEvt.offsetTop + 'px';
            pinMain.style.left = moveEvt.offsetLeft + 'px';
            var x = moveEvt.offsetX;
            var y = moveEvt.offsetY;
            cl(x +'x'+ y);
            // address.value = 'x: ' + (moveEvt.clientX + 20) + ', y: ' + (moveEvt.clientY + 40);
        };
        var onMouseUp = function (upEvt){
            upEvt.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
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
    pinMain.addEventListener('mousedown', function (e) {
        openMap(e);
        pinMove1(e);
    });

})();