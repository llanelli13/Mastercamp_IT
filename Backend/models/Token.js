const mongoose = require('mongoose')
const Schema = mongoose.Schema;
require('dotenv').config();
const tokenSchema = new Schema({
    tokenValue: {
        type: String,
        required: true
    },
    used: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
