const DeviceService = require('../services/device.service');

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
		const device = await DeviceService.findById(req.params.id);
		return res.status(200).json({
			device: device
		});
	} catch (e) {
		return res.status(500).json({
			message: await _prepareErrorMessage(e.message)
		});
	}
}

exports.create = async function (req, res, next) {
	try {
		await DeviceService.create(req.body);
		return res.status(200).json({
			message: 'Device created successfully.'
		});
	} catch (e) {
		return res.status(500).json({
			message: await _prepareErrorMessage(e.message)
		});
	}
}

exports.update = async function (req, res, next) {
	try {
		await DeviceService.update(req.params.id, req.body);
		return res.status(200).json({
			message: 'Device updated successfully.'
		});
	} catch (e) {
		return res.status(500).json({
			message: await _prepareErrorMessage(e.message)
		});
	}
}

exports.delete = async function (req, res, next) {
	try {
		await DeviceService.delete(req.params.id);
		return res.status(200).json({
			message: 'Device deleted successfully.'
		});
	} catch (e) {
		return res.status(500).json({
			message: await _prepareErrorMessage(e.message)
		});
	}
}

exports.index = async function (req, res, next) {
	try {
		let devices = await DeviceService.index();
		return res.status(200).json({
			devices: devices
		});
	} catch (e) {
		return res.status(500).json({
			message: await _prepareErrorMessage(e.message)
		});
	}
}
