const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
require('dotenv').config();
const loanSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    reason: {
        type: String,
        require: true
    }
});

const Loan = mongoose.model('Loan', loanSchema);
module.exports = Loan;
