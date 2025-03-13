const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    image: {
        imageUrl: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        }
    },
    sizes : [{
        type: String,
        required: true
    }],

},{timestamps: true})


const productModel = mongoose.model('Products', productSchema)


module.exports = productModel;
