const mongoose = require('mongoose')
const Schema = mongoose.Schema;
require('dotenv').config();
const bankSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const Bank = mongoose.model('Bank', bankSchema);
module.exports = Bank;
