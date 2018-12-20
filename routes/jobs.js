var express = require('express')
var router = express.Router()
var Job = require('controllers/jobs')
module.exports = function () {
	router.get('/', function (req, res) {
		Job.fetch(req.query, function (error, result) {
			res.send(result)
		})
	})
	router.get('/:company_id/', function (req, res) {
		Job.fetch(req.query, function (error, result) {
			res.send(result)
		})
	})
	return router
}
