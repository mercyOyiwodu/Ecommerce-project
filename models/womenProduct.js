const mongoose = require('mongoose')

const womenSchema = new mongoose.Schema({
 
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
    sizes : [{
        type: String,
        required: true
    }],
    
    womenImage: {
        imageUrl: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        }
    },

},{timestamps: true})


const womenModel = mongoose.model('womenProducts', womenSchema)


module.exports = womenModel;

