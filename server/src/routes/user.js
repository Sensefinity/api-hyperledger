'use strict';
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/logout', UserController.logout);
module.exports = router;