var Job = require('models/Job')
exports.fetch = function (data, done) {
	Job.find(data).limit(50).exec(function (error, data) {
		done(error, data)
	})
}

exports.add = function (data, done) {
	(new Job(data)).save(function (error, job) {
		done(error, job)
	})
}
