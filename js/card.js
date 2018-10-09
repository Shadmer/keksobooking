"use strict";

(function () {
    var cardTemplate = document.querySelector('template')
        .content
        .querySelector('.map__card');
    var renderCard = function (card) {
        var cardItem = cardTemplate.cloneNode(true);
        var getType = function(type) {
            switch (type) {
                case 'flat':
                    return type = 'Квартира';
                case 'house':
                    return type = 'Дом';
                case 'bungalo':
                    return type = 'Бунгало';
                default:
                    return type = 'Нет дома :('
            }
        };
        var getFeatures = function (features) {
            var fragment = document.createDocumentFragment();
            for (var i = 0; i < features.length; i++) {
                var feature = document.createElement('li');
                feature.classList.add('feature');
                feature.classList.add('feature--' + features[i]);
                fragment.appendChild(feature);
            }
            return fragment;
        };
        cardItem.querySelector('h3').textContent = card.offer.title;
        cardItem.querySelector('p small').textContent = card.offer.address;
        cardItem.querySelector('.popup__price').innerHTML = card.offer.price + '&#x20bd;/ночь';
        cardItem.querySelector('h4').textContent = getType(card.offer.type);
        cardItem.querySelector('h4 + p').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
        cardItem.querySelector('h4 + p + p').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
        cardItem.querySelector('.popup__features').innerHTML = '';
        cardItem.querySelector('.popup__features').appendChild(getFeatures(card.offer.features));
        cardItem.querySelector('ul + p').textContent = card.offer.description;
        cardItem.querySelector('.popup__avatar').src = card.author.avatar;
        return cardItem;
    };

    window.card = {
        cardItem: renderCard(data.ads[0])
    };
})();