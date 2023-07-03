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
    askedDate: {
        type: String,
        default: () => {
            let date = new Date();
            let day = String(date.getDate()).padStart(2, '0');
            let month = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            let year = date.getFullYear();

            return `${day}/${month}/${year}`;
        },
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
    broker: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
