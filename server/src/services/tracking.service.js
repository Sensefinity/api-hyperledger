const FabricService = require('./fabric.service');
const toJSONObject = str => JSON.parse(str);

exports.getContract = async function () {
	return await FabricService.getContract();
}

exports.create = async function (data) {
	if (!data.id) throw Error('Please provide id for the tracking details');
	if (!data.device_id) throw Error('Please provide device details.');
	if (!data.product_id) throw Error('Please provide product details.');
	const contract = await module.exports.getContract();
	await contract.submitTransaction('CreateTracking', data.id, data.device_id, data.product_id);
}

exports.update = async function (id, data) {
	if (!id) throw Error('Please provide id of the tracking.');
	if (!data.device_id) throw Error('Please provide device details.');
	if (!data.product_id) throw Error('Please provide product details.');
	const contract = await module.exports.getContract();
	await contract.submitTransaction('UpdateTracking', id, data.device_id, data.product_id);
}

exports.delete = async function (id) {
	if (!id) throw Error('Please provide id of the tracking.');
	const contract = await module.exports.getContract();
	await contract.submitTransaction('DeleteTracking', id);
}

exports.index = async function (deviceId) {
	let query = {
		selector: { docType: 'tracking' },
		// use_index: ['_design/indexProductNameDoc', 'indexProductName']
	};
	if (deviceId) {
		query.selector['deviceId'] = deviceId;
	}
	let trackings = [];
	const contract = await module.exports.getContract();
	let trackingsResult = await contract.evaluateTransaction('QueryResults', JSON.stringify(query));
	trackingsResult = toJSONObject(trackingsResult.toString());
	for (let obj of trackingsResult) {
		let querySensors = {
			selector: {
				docType: 'sensor',
				deviceId: obj.Record.deviceId,
				originTimestamp: { $gte: new Date(obj.pickedTimestamp) }
			}
		};
		if (obj.Record.deliveredTimestamp) {
			querySensors.selector.originTimestamp['$lt'] = new Date(obj.Record.deliveredTimestamp);
		}
		let sensorsResult = await contract.evaluateTransaction('QueryResults', JSON.stringify(querySensors));
		sensorsResult = toJSONObject(sensorsResult.toString());
		let sensors = [];
		for (let sensor of sensorsResult) {
			sensors.push(sensor.Record);
		}
		trackings.push(Object.assign(obj.Record, { sensors: sensors }));
	}
	return trackings;
}

exports.deliver = async function (id) {
	if (!id) throw Error('Please provide id of the tracking.');
	const contract = await module.exports.getContract();
	await contract.submitTransaction('MarkAsDeliverTracking', id);
}
