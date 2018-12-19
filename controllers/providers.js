var Providers = require('models/Providers')
// var Jobs = require('controllers/jobs')
var JobsCategories = require('controllers/JobsCategories')
var async = require('async')
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
		_id: data.name
	}, function (err, row) {
		if (err) done({
			error: true,
			message: 'Can`t find provider'
		})
		try {
			let provider = require(row.path)
			provider.fetch({}, function (list) {
				async.waterfall(list.map(function (category) {
					return function (callback) {
						JobsCategories.fetch({
							title: category.title
						}, function (result) {
							if (result.length === 0) {
								console.log({
									title: category.title
								})
								JobsCategories.add({
									title: category.title
								}, function () {
									callback()
								})
							} else callback()
						})
					}
				}, function () {
					console.log('Done!')
				}))

				// exports.addCategories(list, 0, function (categories) {
				// 	exports.addJobs(categories, 0, done)
				// })
			})
		} catch (e) {
			done({
				error: true,
				message: e.toString()
			})
		}
	})
}
// exports.addJobs = function (categories, current, done) {
// 	if (current < categories.length) {
// 		Jobs.fetch({
// 			title: categories[current].title
// 		}, function (result) {
// 			if (result.length === 0) {
// 				Jobs.add({
// 					title: categories[current].title
// 				}, function (result) {
// 					categories[current] = Object.assign(categories[current], result)
// 					exports.addCategories(categories, ++current, done)
// 				})
// 			} else {
// 				categories[current] = Object.assign(categories[current], result[0])
// 				exports.addCategories(categories, ++current, done)
// 			}
// 		})
// 	} else
// 		done(categories)
// }
exports.addCategories = function (categories, current, done) {
	if (current < categories.length) {
		JobsCategories.fetch({
			title: categories[current].title
		}, function (result) {
			if (result.length === 0) {
				JobsCategories.add({
					title: categories[current].title
				}, function (result) {
					categories[current] = Object.assign(categories[current], result)
					exports.addCategories(categories, ++current, done)
				})
			} else {
				categories[current] = Object.assign(categories[current], result[0])
				exports.addCategories(categories, ++current, done)
			}
		})
	} else
		done(categories)
}
// done(categories)
