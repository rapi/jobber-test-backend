var app = {
	modules: require('./modules'),
}
for (let name in app.modules)
	app[name] = app.modules[name](app)
