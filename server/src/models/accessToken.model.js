const mongoose = require('mongoose');

const AccessTokenSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    isActive: Boolean
}, {
        timestamps: true
    });

const AccessToken = mongoose.model('AccessToken', AccessTokenSchema);

module.exports = AccessToken;