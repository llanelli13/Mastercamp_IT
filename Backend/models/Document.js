const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
require('dotenv').config();
const documentSchema = new Schema({
    loanId: {
        type: Schema.Types.ObjectId,
        ref: 'Loan',
        required: true
    },
    documentName: {
        type: String,
        required: true
    },
    documentLink: {
        type: String,
        required: true
    },
    validation: {
        type: Boolean,
        default: false
    }
});

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;
