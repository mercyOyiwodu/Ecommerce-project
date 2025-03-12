const mongoose = require('mongoose')

const maleSchema = new mongoose.Schema({
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
    maleImage : [{
        type: String,
        required: true
    }],
    
},{timestamps: true})


const maleModel = mongoose.model('Products', maleSchema)


module.exports = maleModel;
