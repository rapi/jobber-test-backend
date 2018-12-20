var axios = require('axios')
var cheerio = require('cheerio')
const site = 'https://rabota.md/'
exports.fetch = function (data, done) {
	exports.fetchCategories(function (categories) {
		exports.fetchJobsFromCategories(categories, 0, function (list) {
			done(false, list)
		})
	})
}
exports.fetchJobsFromCategories = function (categories, current, done) {
	if (current < categories.length) {
		console.log('[' + (current + 1) + '/' + categories.length + ']	FETCH JOBS FROM CATEGORY ' + categories[current].title)
		exports.fetchJobsFromCategory(categories[current], function () {
			setTimeout(function () {
				exports.fetchJobsFromCategories(categories, current + 1, done)
			}, 1000)
		})
	} else done(categories)
}
exports.fetchJobsFromCategory = function (category, done) {
	axios.get(category.link).then(function (e) {
		const $ = cheerio.load(e.data)
		$('.b_info10 .preview').each(function () {
			let company_info = $(this).find('p').first().text().split('•')
			category.jobs.push({
				title: $(this).find('.vacancy').text(),
				link: 'https://rabota.md/vacancies/' + $(this).find('.vacancy').attr('href'),
				company: company_info[0] ? company_info[0].trim() : '',
				location: company_info[1] ? company_info[1].trim() : '',
				description: $(this).find('p').last().text().trim(),
				price: $(this).find('span').last().text().trim(),
			})
		})
		console.log('[+]	FETCHED (' + category.jobs.length + ') ' + category.title)
		done()
	})
}
exports.fetchCategories = function (done) {
	console.log('		FETCH ALL CATEGORIES')
	axios.get(site + 'vacancies')
		.then(e => {
			//get all categories
			let categories = []
			const $ = cheerio.load(e.data)
			$('a[href^="/vacancies/vacancyCategory.php?id="]').each(function () {
				categories.push({
					title: $(this).text().trim(),
					link: site + $(this).attr('href'),
					jobs: [],
				})
			})
			console.log('[+]	FETCHED (' + categories.length + ') CATEGORIES')
			done(categories)
		})

}
