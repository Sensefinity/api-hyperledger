const TrackingService = require('../services/tracking.service');

async function _prepareErrorMessage(message) {
	message = message;
	if (message.includes('No valid responses')) {
		message = message.split('Error: ');
		message = message[1];
	}
	return message;
}

exports.create = async function (req, res, next) {
	try {
		await TrackingService.create(req.body);
		return res.status(200).json({
			message: 'Tracking created successfully'
		});
	} catch (e) {
		return res.status(500).json({
			message: await _prepareErrorMessage(e.message)
		});
	}
}

exports.update = async function (req, res, next) {
	try {
		await TrackingService.update(req.params.id, req.body);
		return res.status(200).json({
			message: 'Tracking updated successfully.'
		});
	} catch (e) {
		return res.status(500).json({
			message: await _prepareErrorMessage(e.message)
		});
	}
}

exports.delete = async function (req, res, next) {
	try {
		await TrackingService.delete(req.params.id);
		return res.status(200).json({
			message: 'Tracking deleted successfully.'
		});
	} catch (e) {
		return res.status(500).json({
			message: await _prepareErrorMessage(e.message)
		});
	}
}

exports.index = async function (req, res, next) {
	try {
		let trackings = await TrackingService.index(req.params.deviceId);
		return res.status(200).json({
			trackings: trackings
		});
	} catch (e) {
		return res.status(500).json({
			message: await _prepareErrorMessage(e.message)
		});
	}
}

exports.deliver = async function (req, res, next) {
	try {
		await TrackingService.deliver(req.params.id);
		return res.status(200).json({
			message: 'Delivered'
		});
	} catch (e) {
		return res.status(500).json({
			message: await _prepareErrorMessage(e.message)
		});
	}

}
