module.exports = function () {
	let mongoose = require('mongoose')
	mongoose.connect('mongodb://localhost/jobeest', {
		useNewUrlParser: true
	})
	require('../models/')
	return mongoose
}
