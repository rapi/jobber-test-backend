var express = require('express')()
// var bodyParser = require('body-parser')
module.exports = function (app) {
	const port = 8000
	express.use(require('express').json())
	// app.express.use(bodyParser.json())
	var routes = require('../routes')
	for (let name in routes) {
		express.use('/' + name, routes[name](app))
	}

	express.listen(port, function () {
		console.log('Example app listening on port ' + port)
	})
	return express
}
