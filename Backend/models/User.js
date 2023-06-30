const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
require('dotenv').config();

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    phoneNumber: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    bank: {
      type: String,
      required: true  
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: '{VALUE} is not a valid email address!'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    pp: {
        type: String
    },
    authTokens: [{
        authToken: {
            type: String,
            required: true
        }
    }]
});



userSchema.methods.generateAuthTokenAndSaveUser = async function(){
    const authToken = jwt.sign({_id: this._id.toString() }, process.env.ACCESS_TOKEN_SECRET);
    this.authTokens.push({authToken})
    await this.save();
    return authToken;
}

userSchema.statics.findUser = async(email, password) => {
    const user = await User.findOne({email});
    if(!user) throw new Error('User not found');
    const isPasswordValid = password === user.password;
    if(!isPasswordValid) throw new Error('Invalid password');
    return user;
}

const User = mongoose.model('User', userSchema);
module.exports = User;