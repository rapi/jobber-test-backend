var JobCategories = require('models/JobCategories')

exports.fetch = function (data, done) {
	JobCategories.find(data).limit(50).exec(function (error, data) {
		done(data)
	})
}
