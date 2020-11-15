'use strict';
const express = require('express');
const router = express.Router();
const DeviceController = require('../controllers/device.controller');

router.get('/', DeviceController.index);
router.get('/:id', DeviceController.get);
router.post('/', DeviceController.create);
router.put('/:id', DeviceController.update);
router.delete('/:id', DeviceController.delete);

module.exports = router;