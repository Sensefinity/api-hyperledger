const crypto = require('crypto');
const SECRET_KEY = 'sensefinity';
const FabricService = require('./fabric.service');

exports.getContract = async function () {
	return await FabricService.getContract();
}

exports.create = async function (data) {
	if (!data.device_id) throw new Error('Please provide device details.');
	if (!data.latitude) throw new Error('Please provide sensor details.');
	if (!data.longitude) throw new Error('Please provide sensor details.');
	if (!data.value) throw new Error('Please provide sensor details.');
	if (!data.type) throw new Error('Please provide sensor details.');
	let signatureData = '';
	signatureData += data.device_id;
	signatureData += data.latitude;
	signatureData += data.longitude;
	signatureData += data.value;
	signatureData += data.type;
	signatureData += data.origin_timestamp;
	let id = crypto.createHmac('sha256', SECRET_KEY).update(signatureData).digest('base64');
	const contract = await module.exports.getContract();
	await contract.submitTransaction('CreateSensor', id, JSON.stringify(data));
}
