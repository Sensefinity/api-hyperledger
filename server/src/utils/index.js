const uuidv4 = require('uuid/v4');

module.exports.getUid = function (type = 'uuid', length = 1) {
    let uid = '';
    if (type == 'uuid') {
        for (let i = 0; i < length; i++) {
            if (i) uid += '-';
            uid += uuidv4();
        }
        return uid;
    }
    let chars = '';
    if (type == 'numeric') {
        chars = '0123456789';
    } else if (type == 'alphaNumeric') {
        chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    }
    const charsLength = chars.length;
    for (let i = 0; i < length; ++i) {
        uid += chars[module.exports.getRandomInt(0, charsLength - 1)];
    }
    return uid;
}

module.exports.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
