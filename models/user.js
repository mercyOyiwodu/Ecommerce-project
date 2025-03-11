const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName : {
        type: String
    },
    email : {
        type: String
    },
    password : {
        type: String
    },
    isVerified:{
        type: Boolean,
        default: false
    },
},{timestamps: true})

const userModel = mongoose.model('users',userSchema)


module.exports = userModel;