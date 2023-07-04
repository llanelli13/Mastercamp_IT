const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
require('dotenv').config();
const bankAccShema = new Schema({
    id: {
      type: String,
      required: true  
    },
    pwd: {
        type: String,
        required: true
    },
    bank: {
        type: Schema.Types.ObjectId,
        ref: 'Bank',
        required: true
    },
});

const BankAcc = mongoose.model('BankAcc', bankAccShema);
module.exports = BankAcc;
