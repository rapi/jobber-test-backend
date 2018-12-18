module.exports = function () {
	let mongoose = require('mongoose')
	mongoose.set('useCreateIndex', true)
	mongoose.connect('mongodb://localhost/jobeest', {
		useNewUrlParser: true
	})
	require('../models/')
	return mongoose
}
