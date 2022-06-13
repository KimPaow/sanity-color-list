"use strict";
exports.__esModule = true;
exports.makeAnOffer = void 0;
var makeAnOffer = function (amount, name) {
    if (amount <= 40) {
        return "Is this a joke ".concat(name, "!");
    }
    else if (amount < 100) {
        return "That is not quite what I want ".concat(name, "!");
    }
    else if (amount === 100) {
        return "That was exactly what I was looking for ".concat(name, "!");
    }
    else {
        return "I will take it ".concat(name, "!");
    }
};
exports.makeAnOffer = makeAnOffer;
