var mongoose = require('mongoose')
var Schema = mongoose.Schema
let JobSchema = new Schema({
	title: String,
	link: {
		type: String,
		index: {
			unique: true
		}
	},
	updated: {
		type: Date,
		default: Date.now
	},
	price: String,
	company: String,
	location: String,
	description: String,
	provider: {
		type: Schema.Types.ObjectId,
		ref: 'Providers'
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'JobCategories'
	}
})
module.exports = mongoose.model('Job', JobSchema)
