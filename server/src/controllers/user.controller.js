const UserService = require('./../services/user.service');

exports.login = async function (req, res, next) {
	try {
		let accessToken = await UserService.login({
			email: req.body.email,
			password: req.body.password,
			grant_type: req.body.grant_type
		});
		return res.status(200).json({
			token_type: 'Bearer',
			access_token: accessToken
		});
	} catch (e) {
		return res.status(500).json({
			message: e.message
		});
	}
}

exports.logout = async function (req, res, next) {
	try {
		let [scheme, token] = req.headers['authorization'].toString().split(' ');
		await UserService.logout(token);
		return res.status(200).json({
			message: 'Logout success.'
		});
	} catch (e) {
		return res.status(500).json({
			message: e.message
		});
	}
}
