// Модуль работы с формой

"use strict";

(function () {
    var timein = document.querySelector('#timein');
    var timeout = document.querySelector('#timeout');
    var type = document.querySelector('#type');
    var price = document.querySelector('#price');
    var roomNumber = document.querySelector('#room_number');
    var optionsInRoom = roomNumber.querySelectorAll('option');
    var capacity = document.querySelector('#capacity');

// как сделать лучше сраные селекты?
    var onTimeInput = function () {
        switch (this.value) {
            case "12:00":
                timeout.options[0].selected = true;
                timein.options[0].selected = true;
                break;
            case "13:00":
                timeout.options[1].selected = true;
                timein.options[1].selected = true;
                break;
            case "14:00":
                timeout.options[2].selected = true;
                timein.options[2].selected = true;
                break;
        }
    };
    var onTypeInput = function () {
        switch (this.value) {
            case "flat":
                price.setAttribute('min', '1000');
                break;
            case "bungalo":
                price.setAttribute('min', '0');
                break;
            case "house":
                price.setAttribute('min', '5000');
                break;
            case "palace":
                price.setAttribute('min', '10000');
                break;
        }
    };
// Как сделать нормально?
    var onRoomNumberInput = function () {

        for (var i = 0; i < optionsInRoom.length; i++) {
            capacity.options[i].classList.add('hidden');
        }

        switch (this.value) {
            case "1":
                capacity.options[2].classList.remove('hidden');
                capacity.options[2].selected = true;
                break;
            case "2":
                capacity.options[1].classList.remove('hidden');
                capacity.options[2].classList.remove('hidden');
                capacity.options[1].selected = true;
                break;
            case "3":
                capacity.options[0].classList.remove('hidden');
                capacity.options[1].classList.remove('hidden');
                capacity.options[2].classList.remove('hidden');
                capacity.options[0].selected = true;
                break;
            case "100":
                capacity.options[3].classList.remove('hidden');
                capacity.options[3].selected = true;
                break;
        }
    };

    timein.addEventListener('input', onTimeInput);
    timeout.addEventListener('input', onTimeInput);
    type.addEventListener('input', onTypeInput);
    roomNumber.addEventListener('input', onRoomNumberInput);
})();