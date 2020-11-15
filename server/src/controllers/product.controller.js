const ProductService = require('../services/product.service');

async function _prepareErrorMessage(message) {
	message = message;
	if (message.includes('No valid responses')) {
		message = message.split('Error: ');
		message = message[1];
	}
	return message;
}

exports.get = async function (req, res, next) {
	try {
		const product = await ProductService.findById(req.params.id);
		return res.status(200).json({
			product: product
		});
	} catch (e) {
		return res.status(500).json({
			message: await _prepareErrorMessage(e.message)
		});
	}
}

exports.create = async function (req, res, next) {
	try {
		await ProductService.create(req.body);
		return res.status(200).json({
			message: 'Product added successfully.'
		});
	} catch (e) {
		return res.status(500).json({
			message: await _prepareErrorMessage(e.message)
		});
	}
}

exports.update = async function (req, res, next) {
	try {
		await ProductService.update(req.params.id, req.body);
		return res.status(200).json({
			message: 'Product updated successfully.'
		});
	} catch (e) {
		return res.status(500).json({
			message: await _prepareErrorMessage(e.message)
		});
	}
}

exports.delete = async function (req, res, next) {
	try {
		await ProductService.delete(req.params.id);
		return res.status(200).json({
			message: 'Product deleted successfully.'
		});
	} catch (e) {
		return res.status(500).json({
			message: await _prepareErrorMessage(e.message)
		});
	}
}

exports.index = async function (req, res, next) {
	try {
		const products = await ProductService.index();
		return res.status(200).json({
			products: products
		});
	} catch (e) {
		return res.status(500).json({
			message: await _prepareErrorMessage(e.message)
		});
	}
}
