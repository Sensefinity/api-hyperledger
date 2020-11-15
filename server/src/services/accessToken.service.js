const utils = require('../utils');

const AccessToken = require('../models/accessToken.model');

exports.findById = async function (id) {
    let accessToken = await AccessToken.findOne({ _id: id });
    if (!accessToken) { return false }
    return accessToken;
}

exports.create = async function (userId) {
    let _id = utils.getUid('alphaNumeric', 92);
    await AccessToken.create({
        _id: _id,
        userId: userId,
        isActive: true
    });
    return _id;
}

exports.deactivate = async function (_id) {
    await AccessToken.updateOne({
        _id: _id
    }, {
            $set: {
                isActive: false
            }
        });
}
