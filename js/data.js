"use strict";

(function () {

    var ads = [];
    var avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
    var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
    var types = ['flat', 'bungalo', 'house'];
    var times = ['12:00', '13:00', '14:00'];
    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var getAd = function () {
        var ad = {};
        var getAuthor = function () {
            var author = {};
            var avatarsLength = util.getRandom(0, avatars.length - 1);
            var avatar = avatars.splice(avatarsLength, 1);
            author.avatar = 'img/avatars/user' + avatar + '.png';
            return author
        };
        var getLocation = function () {
            var location = {};
            location.x = util.getRandom(300, 900);
            location.y = util.getRandom(100, 500);
            return location;
        };
        var getOffer = function () {
            var offer = {};
            var titlesLength = util.getRandom(0, titles.length - 1);
            offer.title = titles.splice(titlesLength, 1)[0];
            offer.address = ad.location.x + " " + ad.location.y;
            offer.price = util.getRandom(1000, 1000000);
            offer.type = types[util.getRandom(0, 2)];
            offer.rooms = util.getRandom(1, 5);
            offer.guests = util.getRandom(1, 5);
            offer.checkin = times[util.getRandom(0, 2)];
            offer.checkout = times[util.getRandom(0, 2)];
            offer.features = util.getRandomArr(features);
            offer.description = '';
            offer.photos = [];
            return offer;
        };
        ad.author = getAuthor();
        ad.location = getLocation();
        ad.offer = getOffer();
        return ad;
    };
    var numberOfAds = 8;
    for (var i = 0; i < numberOfAds; i++) {
        ads.push(getAd());
    }

    window.data = {
        ads: ads
    };
})();