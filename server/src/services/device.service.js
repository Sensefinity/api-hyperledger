const FabricService = require('./fabric.service');
const toJSONObject = str => JSON.parse(str);

exports.getContract = async function () {
	return await FabricService.getContract();
}

exports.findById = async function (id) {
	if (!id) throw Error('Please provide id of the device.');
	const contract = await module.exports.getContract();
	let device = await contract.submitTransaction('ReadDevice', id);
	return toJSONObject(device.toString());
}

exports.create = async function (data) {
	if (!data.id) throw Error('Please provide id for the device.');
	if (!data.name) throw Error('Please provide name for the device.');
	const contract = await module.exports.getContract();
	await contract.submitTransaction('CreateDevice', data.id, data.name);
}

exports.update = async function (id, data) {
	if (!id) throw Error('Please provide id of the device.');
	if (!data.name) throw Error('Please provide name of the device.');
	const contract = await module.exports.getContract();
	await contract.submitTransaction('RenameDevice', id, data.name);
}

exports.delete = async function (id) {
	if (!id) throw Error('Please provide id of the device.');
	const contract = await module.exports.getContract();
	await contract.submitTransaction('DeleteDevice', id);
}

exports.index = async function (data) {
	let query = {
		selector: { docType: 'device' },
		// use_index: ['_design/indexDeviceNameDoc', 'indexDeviceName']
	};
	const contract = await module.exports.getContract();
	let result = await contract.evaluateTransaction('QueryResults', JSON.stringify(query));
	result = toJSONObject(result.toString());
	let devices = [];
	for (let obj of result) {
		devices.push(obj.Record);
	}
	return devices;
}
