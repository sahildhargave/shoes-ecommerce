
const mongoose = require('mongoose');
const Product = require('./Product');

const CartSchema = new mongoose.Schema({
userId: {type: String, required: true},
products: [

	{
     cartItems:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product"
	 },
	 quantity: { type: Number , default : 1}
	}
]
},{timestamps: true});

module.exports = mongoose.model("Cart", CartSchema);