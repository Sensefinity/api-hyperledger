const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const AccessTokenService = require('../services/accessToken.service');
const utils = require('../utils');

exports.findById = async function (_id) {
    return await User.findById(_id);
}

exports.findByEmail = async function (email) {
    return await User.findOne({ email: email }).lean();
}

exports.verifyPassword = async function (user, password) {
    return bcrypt.compareSync(password, user.password);
}

exports.login = async function (obj) {
    if (!obj.email) throw Error('Please provide email address');
    if (!obj.password) throw Error('Please provide password.');
    let user = await module.exports.findByEmail(obj.email);
    if (!user) throw Error('User not found.');
    if (!await module.exports.verifyPassword(user, obj.password)) throw Error('Invalid credentials.');
    let token = await AccessTokenService.create(user._id);
    if (!token) throw Error('Error occurred.');
    return token;
}

exports.createAdminUser = async function () {
    const email = 'admin@sensefinity.com';
    let user = await module.exports.findByEmail(email);
    if (!user) {
        user = await User.create({
            _id: utils.getUid('alphaNumeric', 32),
            email: email,
            password: '$2a$10$NxOvuXFQCTl3RfWOlCzlNuzayaiXHM1rqnP1RqVc/PtszyShw99TC',
            name: 'Admin'
        });
        console.log('Admin user created successfully');
    }
}

exports.logout = async function (token) {
    await AccessTokenService.deactivate(token);
}
