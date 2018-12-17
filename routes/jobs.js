var express = require('express')
var router = express.Router()
// var controller=require('@con')
module.exports = function () {
	router.get('/', function (req, res) {
		res.send('test')
	})
	return router
}
