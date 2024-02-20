
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	name: { type: String, required: true },
	title: {type:String, required: true},
    category: {type: String, required:true},
	imageUrl: {type:[String], required: true},
	oldPrice: {type:String, required: true},
	sized:{
		type:[
			{
				sizes:{
					type:String, required: true
				},
				isSelected:{
					type: Boolean, required: false, default: false
				}
			}
		]
	},
	price: {type:String, required: true},
	description: {type:String, required:true}

},{timestamps:true});

module.exports = mongoose.model("Product",ProductSchema);