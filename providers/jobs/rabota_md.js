var axios = require('axios')
var cheerio = require('cheerio')
exports.fetch = function (data, done) {
	data
	axios.post('https://www.rabota.md/all/loadMoreVac_test.php', {
		page: 1
	})
		.then(e => {
			const $ = cheerio.load(e)
			console.log($('table').text())
		})
	done({
		success: true
	})

}
