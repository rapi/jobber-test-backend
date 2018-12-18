var axios = require('axios')
var cheerio = require('cheerio')
// var fetch = require('node-fetch')
var JobCategories = require('models/JobCategories')
var Providers = require('models/Providers')
var Job = require('models/Job')
var Provider = false
exports.fetch = function (data, done) {
	Providers.findOne({
		link: 'https://rabota.md'
	}, function (err, provider) {
		Provider = provider
		if (err) done({
			error: true,
			message: 'provider is not implemented'
		})
		exports.fetchCategories(provider, function (categories) {
			exports.fetchJobsFromCategories(categories, 0, {}, function () {
				done({
					success: true
				})
			})
		})
	})
}
exports.fetchJobsFromCategories = function (categories, current, list, done) {
	if (current < categories.length)
		exports.fetchJobsFromCategory(categories[current], function () {
			// list[categories[current].title] = jobs
			// done(list)
			setTimeout(function () {
				exports.fetchJobsFromCategories(categories, current + 1, list, done)
			}, 1000)
		})
	else done()
}
exports.fetchJobsFromCategory = function (category, done) {
	axios.get('https://rabota.md' + category.link).then(function (e) {
		let jobs = []
		const $ = cheerio.load(e.data)
		$('.b_info10 .preview').each(function () {
			let company_info = $(this).find('p').first().text().split('•')
			let job = new Job({
				title: $(this).find('.vacancy').text(),
				link: 'https://rabota.md/vacancies/' + $(this).find('.vacancy').attr('href'),
				company: company_info[0] ? company_info[0].trim() : '',
				location: company_info[1] ? company_info[1].trim() : '',
				description: $(this).find('p').last().text().trim(),
				price: $(this).find('span').last().text().trim(),
				provider: Provider,
			})
			job.save().catch(function () {})
		})
		done(jobs)
	})
}
exports.fetchCategories = function (provider, done) {
	axios.get('https://www.rabota.md/ru/vacancies')
		.then(e => {
			//get all categories
			let categories = []
			const $ = cheerio.load(e.data)
			$('a[href^="/vacancies/vacancyCategory.php?id="]').each(function () {
				categories.push(new JobCategories({
					title: $(this).text().trim(),
					link: $(this).attr('href'),
					providers: provider
				}))
				categories[categories.length - 1].save().catch(() => {})
			})
			done(categories)
		})

}
