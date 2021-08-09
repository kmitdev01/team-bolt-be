//const mongoose = require("mongoose");
//mongoose.connect('mongodb://localhost:27017/teambolt', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

 const mongoose = require('mongoose')

const url = 'mongodb+srv://teambolt:Admin@123@cluster0.gpi0b.mongodb.net/teambolt-db?retryWrites=true&w=majority';

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
	}
 mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

module.exports = mongoose;