var express = require('express')
var router = express.Router()
var ProvidersController = require('../controllers/providers')

// var controller=require('@con')
module.exports = function () {
	router.get('/', function (req, res) {
		ProvidersController.fetch(req.query, function (result) {
			res.send(result)
		})
	})
	router.all('/:name/fetch', function (req, res) {
		ProvidersController.fetch(req.params, function (result) {
			res.send(result)
		})
	})
	return router
}
