const mongoose = require('mongoose');

const femaleSchema = new mongoose.Schema({
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
    femaleImage : [{
        type: String,
        required: true
    }],
    
},{timestamps: true})

const femaleModel = mongoose.model('Products', femaleSchema)


module.exports = femaleModel;