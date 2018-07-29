"use strict";

// Массивы с данными
var AD_AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var AD_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var AD_TYPES = ['flat', 'house', 'bungalo'];
var AD_TIMES = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Карта
var map = document.querySelector(".map");

// Открытие карты
map.classList.remove("map--faded");

//Штырьки для карты
var mapPins = document.querySelector(".map__pins");

// Массив объявлений
var ads = getAds(AD_AVATARS, AD_TITLES, AD_TYPES, AD_TIMES, AD_FEATURES, 8);

var markTemplate = document.querySelector('template')
    .content
    .querySelector('.map__pin');

var adTemplate = document.querySelector('template')
    .content
    .querySelector('.map__card');


var markFragment = document.createDocumentFragment();
var adFragment = document.createDocumentFragment();


for (var i = 0; i < ads.length; i++) {
    markFragment.appendChild(renderMark(ads[i]));
    adFragment.appendChild( renderAd(ads[i]) );
}

mapPins.appendChild(markFragment);
map.appendChild(adFragment);


// Функции

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

function renderMark(mark) {
    var markItem = markTemplate.cloneNode(true);
    markItem.style.left = mark.location.x + 'px';
    markItem.style.top = mark.location.y + 'px';
    markItem.querySelector('img').src = mark.author.avatar;
    return markItem;
}

// Генератор массива объявлений
function getAds(avatars, titles, types, times, features, amount) {
    var amount = amount || 1;
    var ads = [];
    var copyAvatars = avatars.slice();
    var copyTitles = titles.slice();

    for (var i = 0; i < amount; i++) {
        var n1 = getRandom(0, copyAvatars.length - 1);
        var n2 = getRandom(0, copyTitles.length - 1);
        var avatar = copyAvatars.splice(n1, 1);
        var title = copyTitles.splice(n2, 1);
        var ad = getAd(avatar, title, types, times, features);
        ads.push(ad);
    }

    return ads;
};

// Генератор объявления
function getAd(avatar, title, types, times, features) {
    var ad = {};
    var author = {};
    var offer = {};
    var location = {};

    var iType = getRandom(0, 2);
    var iCheckin = getRandom(0, 2);
    var iCheckout = getRandom(0, 2);
    var iFeatures = getRandom(0, 5);

    var locationX = getRandom(300, 900);
    var locationY = getRandom(100, 500);

    author.avatar = 'img/avatars/user' + avatar + '.png';

    offer.title = title;
    offer.address = locationX + " " + locationY;
    offer.price = getRandom(1000, 1000000);
    offer.type = types[iType];
    offer.rooms = getRandom(1, 5);
    offer.guests = getRandom(1, 5);
    offer.checkin = times[iCheckin];
    offer.checkout = times[iCheckout];
    offer.features = getRandomArr(features);
    offer.description = '';
    offer.photos = [];

    location.x = locationX;
    location.y = locationY;

    ad.author = author;
    ad.offer = offer;
    ad.location = location;

    return ad;
}

// Всякие штуки
function getRandomArr(arr) {
    var clone = arr.slice();
    clone.length = getRandom(1, arr.length);
    return clone.sort(compareRandom);
}

function getRandom(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function cl(value) {
    return console.log(value);
}

function compareRandom(a, b) {
    return Math.random() - 0.5;
}