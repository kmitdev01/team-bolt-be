const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    catName: {
        type: String,
        unique: true,
        require: true,
        trim: true,
    },
    status: {
        type: Boolean,
        default: 0
    }

}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema)

module.exports = Category;