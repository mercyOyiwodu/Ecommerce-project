const { required } = require("joi")
const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
        required: true
    },

    items: [{
        productId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Products",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
}, {timestamps: true});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel