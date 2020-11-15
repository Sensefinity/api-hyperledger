'use strict';
const express = require('express');
const router = express.Router();
const TrackingController = require('../controllers/tracking.controller');

router.get('/:deviceId', TrackingController.index);
router.post('/', TrackingController.create);
router.put('/:id', TrackingController.update);
router.delete('/:id', TrackingController.delete);
router.put('/:id/deliver', TrackingController.deliver);

module.exports = router;