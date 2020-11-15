'use strict';
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

router.get('/', ProductController.index);
router.get('/:id', ProductController.get);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;