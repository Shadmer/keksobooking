"use strict";

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var adAvatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
var adTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var adTimes = ['12:00', '13:00', '14:00'];
var adFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var adTypes = ['flat', 'bungalo', 'house'];
var map = document.querySelector(".map");
var mapPins = document.querySelector(".map__pins");
var pinMain = document.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
var fieldsets = noticeForm.querySelectorAll('fieldset');
var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');
var type = document.querySelector('#type');
var price = document.querySelector('#price');
var roomNumber = document.querySelector('#room_number');
var optionsInRoom = roomNumber.querySelectorAll('option');
var capacity = document.querySelector('#capacity');
var selectedPin = null;
var selectedAd = null;

//Массив объявлений
var ads = [];
var numberOfAds = 8;
for (var i = 0; i < numberOfAds; i++) {
    ads.push(getAd());
}

// Шаблон иконки на карте
var markTemplate = document.querySelector('template')
    .content
    .querySelector('.map__pin');

// Шаблон объявления на карте
var adTemplate = document.querySelector('template')
    .content
    .querySelector('.map__card');

// Генерация иконок и объявлений
var markFragment = document.createDocumentFragment();
for (var i = 0; i < ads.length; i++) {
    markFragment.appendChild(renderMark(ads[i]));
}

// Генератор объявления
function getAd() {
    var ad = {};
    var author = {};
    var location = {};
    var offer = {};
    var avatarsLength = getRandom(0, adAvatars.length - 1);
    var titlesLength = getRandom(0, adTitles.length - 1);
    var avatar = adAvatars.splice(avatarsLength, 1);
    var title = adTitles.splice(titlesLength, 1);

    author.avatar = 'img/avatars/user' + avatar + '.png';

    location.x = getRandom(300, 900);
    location.y = getRandom(100, 500);

    offer.title = title;
    offer.address = location.x + " " + location.y;
    offer.price = getRandom(1000, 1000000);
    offer.type = adTypes[getRandom(0, 2)];
    offer.rooms = getRandom(1, 5);
    offer.guests = getRandom(1, 5);
    offer.checkin = adTimes[getRandom(0, 2)];
    offer.checkout = adTimes[getRandom(0, 2)];
    offer.features = getRandomArr(adFeatures);
    offer.description = '';
    offer.photos = [];

    ad.author = author;
    ad.location = location;
    ad.offer = offer;

    return ad;
}

// Генератор элемента карты
function renderMark(mark) {
    var markItem = markTemplate.cloneNode(true);
    markItem.style.left = mark.location.x + 'px';
    markItem.style.top = mark.location.y + 'px';
    markItem.querySelector('img').src = mark.author.avatar;
    return markItem;
}

// Генератор элемента объявления
function renderAd(ad) {
    var adItem = adTemplate.cloneNode(true);
    var type = ad.offer.type;
    switch (type) {
        case 'flat':
            type = 'Квартира';
            break;
        case 'house':
            type = 'Дом';
            break;
        case 'bungalo':
            type = 'Бунгало';
            break;
        default:
            type = 'Нет дома :('
    }

    adItem.querySelector('h3').textContent = ad.offer.title;
    adItem.querySelector('p small').textContent = ad.offer.address;
    adItem.querySelector('.popup__price').innerHTML = ad.offer.price + '&#x20bd;/ночь';
    adItem.querySelector('h4').textContent = type;
    adItem.querySelector('h4 + p').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    adItem.querySelector('h4 + p + p').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    adItem.querySelector('.popup__features').innerHTML = '';
    adItem.querySelector('.popup__features').appendChild(generateFeatures(ad.offer.features));
    adItem.querySelector('ul + p').textContent = ad.offer.description;
    adItem.querySelector('.popup__avatar').src = ad.author.avatar;

    return adItem;
}

// Генератор удобств в объявлении
function generateFeatures(features) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
        var feature = document.createElement('li');
        feature.classList.add('feature');
        feature.classList.add('feature--' + features[i]);
        fragment.appendChild(feature);
    }

    return fragment;
}

function cl(value) {
    return console.log(value);
}

function getRandom(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomArr(arr) {
    var clone = arr.slice();
    clone.length = getRandom(1, arr.length);
    return clone.sort(compareRandom);
}

function compareRandom(a, b) {
    return Math.random() - 0.5;
}

function openMap() {
    map.classList.remove("map--faded");
    mapPins.appendChild(markFragment);
    noticeForm.classList.remove('notice__form--disabled');
    for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].removeAttribute('disabled');
    }

}

function onPinClick(node) {
    if (selectedPin) {
        selectedPin.classList.remove('map__pin--active');
    }
    selectedPin = node;
    selectedPin.classList.add('map__pin--active');

    if (selectedAd) {
        selectedAd.remove();
    }

    selectedAd = renderAd(ads[0]);
    map.appendChild(selectedAd);
}

function onCloseClick() {
    selectedPin.classList.remove('map__pin--active');
    selectedAd.remove();
    selectedAd = null;
    document.removeEventListener('keydown', onPopupEsc);
}

function onPopupEsc(e) {
    if(e.keyCode === ESC_KEYCODE) {
        onCloseClick();
    }
}

// как сделать лучше сраные селекты?
function onTimeinInput() {
    switch (this.value) {
        case "12:00":
            timeout.options[0].selected=true;
            break;
        case "13:00":
            timeout.options[1].selected=true;
            break;
        case "14:00":
            timeout.options[2].selected=true;
            break;
    }
}

function onTypeInput() {
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
}

// Как сделать нормально?
function onRoomNumberInput() {

    for (var i = 0; i < optionsInRoom.length; i++) {
        capacity.options[i].classList.add('hidden');
    }

    switch (this.value) {
        case "1":
            capacity.options[2].classList.remove('hidden');
            capacity.options[2].selected=true;
            break;
        case "2":
            capacity.options[1].classList.remove('hidden');
            capacity.options[2].classList.remove('hidden');
            capacity.options[1].selected=true;
            break;
        case "3":
            capacity.options[0].classList.remove('hidden');
            capacity.options[1].classList.remove('hidden');
            capacity.options[2].classList.remove('hidden');
            capacity.options[0].selected=true;
            break;
        case "100":
            capacity.options[3].classList.remove('hidden');
            capacity.options[3].selected=true;
            break;
    }
}

// Обработчики
pinMain.addEventListener('mouseup', function () {
    openMap();
});

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

timein.addEventListener('input', onTimeinInput);

type.addEventListener('input', onTypeInput);

roomNumber.addEventListener('input', onRoomNumberInput);

