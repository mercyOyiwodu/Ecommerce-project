const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true,
    },
    reference: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: ['Pending', 'Successful', 'Failed'],
        default: 'Pending'
    },
    paymentDate: {
        type: Date,
        required: true
    }

}, { timestamps: true })

const paymentModel = mongoose.model("Payments", paymentSchema);

module.exports = paymentModel




