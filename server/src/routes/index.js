'use strict'
const express = require('express');
const serveStatic = require('serve-static');
const router = express.Router();
const user = require('./user');
const device = require('./device');
const product = require('./product');
const tracking = require('./tracking');
const sensor = require('./sensor');
const AuthController = require('../controllers/auth.controller');
const UserController = require('../controllers/user.controller');

router.use('/explorer', serveStatic('explorer', { index: ['index.html'] }));
router.use('/user/login', UserController.login);
router.use('/sensor', sensor);

router.use(AuthController.verifyToken);
router.use('/user', user);
router.use('/device', device);
router.use('/product', product);
router.use('/tracking', tracking);

router.use('*', (req, res) => res.sendStatus(404));

module.exports = router;
