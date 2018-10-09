"use strict";

function cl(value) {
    return console.log(value);
}
(function () {
    window.util = {
        getRandom: function (min, max) {
            return Math.floor(min + Math.random() * (max + 1 - min));
        },
        compareRandom: function (a, b) {
            return Math.random() - 0.5;
        },
        getRandomArr: function (arr) {
            var clone = arr.slice();
            clone.sort(util.compareRandom);
            clone.length = util.getRandom(1, arr.length);
            return clone;
        }
    };
})();