const SensorService = require('../services/sensor.service');

async function _prepareErrorMessage(message) {
	message = message;
	if (message.includes("No valid responses")) {
		message = message.split('Error: ');
		message = message[1];
	}
	return message;
}

exports.create = async function (req, res, next) {
	try {
		await SensorService.create(req.body);
		return res.status(200).json({
			message: 'Sensor data added successfully.'
		});
	} catch (e) {
		return res.status(500).json({
			message: await _prepareErrorMessage(e.message)
		});
	}
}
