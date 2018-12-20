var express = require('express')
var router = express.Router()
var JobsCategories = require('controllers/JobsCategories')
module.exports = function () {
	router.get('/', function (req, res) {
		JobsCategories.fetch(req.query, function (error, result) {
			res.send(result)
		})
	})
	return router
}
