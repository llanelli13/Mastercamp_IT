const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
require('dotenv').config();
const documentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    documentType: {
        type: String,
        required: true
    },
    documentLink: {
        type: String,
        required: true
    },
    verificationStatus: {
        type: String,
        enum: ['pending', 'verified', 'not verified'],
        default: 'pending'
    }
});

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;
