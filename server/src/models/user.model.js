const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
}, {
	timestamps: true,
	toObject: {
		transform: function (doc, ret, game) {
			delete ret.__v;
			delete ret.password;
		}
	},
	toJSON: {
		transform: function (doc, ret, game) {
			delete ret.__v;
			delete ret.password;
		}
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;