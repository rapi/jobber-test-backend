var Providers = require('models/Providers')
var Jobs = require('controllers/jobs')
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
		let provider = require(row.path)
		provider.fetch({}, function (error, list) {
			async.parallelLimit(list.map(function (category, i) {
				return function (callback) {
					JobsCategories.fetch({
						title: category.title
					}, function (error, result) {
						if (error) console.log(error)
						if (result.length === 0) {
							JobsCategories.add({
								title: category.title
							}, function (error, document) {
								list[i].id = document.id
								// if (error) console.log(error)
								callback()
							})
						} else {
							list[i].id = result[0].id
							callback()
						}
					})
				}
			}),
			10,
			function () {
				async.parallelLimit(list.reduce(function (jobs, category) {
					return jobs.concat(category.jobs.map(function (job) {
						return Object.assign(job, {
							category: category.id
						})
					}))
				}, []).map(function (job) {
					return function (callback) {
						Jobs.add(job, function () {
							// if (error) console.log(error)
							callback()
						})
					}
				}), 10, function () {
					done(list)
				})
			}
			)

			// exports.addCategories(list, 0, function (categories) {
			// 	exports.addJobs(categories, 0, done)
		})
	})
	// }
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
