var mongoose = require('mongoose')
var Schema = mongoose.Schema
let JobsSchema = new Schema({
	title: String,
	description: String,
	provider: [{
		type: Schema.Types.ObjectId,
		ref: 'Providers'
	}]
})
module.exports = mongoose.model('Jobs', JobsSchema)
