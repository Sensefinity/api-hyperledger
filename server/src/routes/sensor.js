'use strict';
const express = require('express');
const router = express.Router();
const SensorController = require('../controllers/sensor.controller');

router.post('/', SensorController.create);

module.exports = router;