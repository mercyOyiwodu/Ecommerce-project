const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName : {
        type: String,
    },
    email : {
        type: String,
        required: true,
        lowercase: true
    },
    password : {
        type: String,
        required: true

    },
    username : {
        type: String,
        lowercase: true
        
    },

    isVerified:{
        type: Boolean,
        default: false
    },
},{timestamps: true})

const userModel = mongoose.model('users',userSchema)


module.exports = userModel;