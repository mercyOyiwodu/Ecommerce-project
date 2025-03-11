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
    maleImage : [{
        type: String,
        required: true
    }],
    femaleImage : [{
        type: String,
        required: true
    }],
    sizes : [{
        type: String,
        required: true
    }],
    
},{timestamps: true})


const productModel = mongoose.model('Products', productSchema)


module.exports = productModel;
