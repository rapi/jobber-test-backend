var JobCategories = require('models/JobCategories')

exports.fetch = function (data, done) {
	JobCategories.find(data).limit(50).exec(function (error, data) {
		done(error, data)
	})
}

exports.add = function (data, done) {
	(new JobCategories(data)).save(function (error, category) {
		done(error, category)
	})
}
