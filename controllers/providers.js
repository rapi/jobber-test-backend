var Providers = require('models/Providers')
exports.fetch = function (data, done) {
	done('ssss')
}
exports.add = function (data, done) {
	let provider = new Providers(data)
	provider.save()
	done('done')
}
exports.fetch = function (data, done) {
	Providers.findOne({
		name: data.name
	}, function (err, row) {
		if (err) done({
			error: true,
			message: 'Can`t find provider'
		})
		try {
			let provider = require(row.path)
			provider.fetch({}, function (data) {
				done(data)
			})
		} catch (e) {
			done({
				error: true,
				message: e.toString()
			})
		}
	})
}
