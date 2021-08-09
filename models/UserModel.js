const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
    },
    status: {
        type: Boolean,
        default: 0
    },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;