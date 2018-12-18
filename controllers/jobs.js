var Job = require('models/Job')
exports.fetch = function (data, done) {
	Job.find(data).limit(50).exec(function (error, data) {
		done(data)
	})
}
