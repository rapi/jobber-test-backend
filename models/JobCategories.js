var mongoose = require('mongoose')
var Schema = mongoose.Schema
let JobCategorySchema = new Schema({
	title: {
		type: String,
		index: {
			unique: true
		}
	},
	link: String,
	providers: [{
		type: Schema.Types.ObjectId,
		ref: 'Providers'
	}]
})
module.exports = mongoose.model('JobCategory', JobCategorySchema)
