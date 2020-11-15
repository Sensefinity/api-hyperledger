const FabricService = require('./fabric.service');
const toJSONObject = str => JSON.parse(str);

exports.getContract = async function () {
	return await FabricService.getContract();
}

exports.findById = async function (id) {
	if (!id) throw Error('Please provide id of the product.');
	const contract = await module.exports.getContract();
	let product = await contract.submitTransaction('ReadProduct', id);
	return toJSONObject(product.toString());
}

exports.create = async function (data) {
	if (!data.id) throw Error('Please provide id for the product.');
	if (!data.name) throw Error('Please provide name for the product.');
	const contract = await module.exports.getContract();
	await contract.submitTransaction('CreateProduct', data.id, data.name);
}

exports.update = async function (id, data) {
	if (!id) throw Error('Please provide id of the product.');
	if (!data.name) throw Error('Please provide name of the product.');
	const contract = await module.exports.getContract();
	await contract.submitTransaction('RenameProduct', id, data.name);
}

exports.delete = async function (id) {
	if (!id) throw Error('Please provide id of the product.');
	const contract = await module.exports.getContract();
	await contract.submitTransaction('DeleteProduct', id);
}

exports.index = async function (data) {
	let query = {
		selector: { docType: 'product' },
		// use_index: ['_design/indexProductNameDoc', 'indexProductName']
	};
	const contract = await module.exports.getContract();
	let result = await contract.evaluateTransaction('QueryResults', JSON.stringify(query));
	result = toJSONObject(result.toString());
	let products = [];
	for (let obj of result) {
		products.push(obj.Record);
	}
	return products;
}
