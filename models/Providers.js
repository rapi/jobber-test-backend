var mongoose = require('mongoose')
var Schema = mongoose.Schema
let ProvidersSchema = new Schema({
	name: String,
	path: String,
	link: String,
	frequency: Number,
})
module.exports = mongoose.model('Providers', ProvidersSchema)
