const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
require('dotenv').config();
const adminSchema = new Schema({
    adminUser: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
