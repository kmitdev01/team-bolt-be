const express = require('express');
const app = express()
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
require('./config/db');
var cors = require('cors');
//! parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//! parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/images', express.static('images'));
const formData = require("express-form-data");
app.use(formData.parse());

var UserRoutes = require('./routes/userRoute');
var CategoryRoutes = require('./routes/categoryRoute');
app.use("/api/", cors(), UserRoutes);
app.use("/api/", cors(), CategoryRoutes);



app.listen(port, () => console.log("Teambolt app listening on " + port + " port!"))

module.exports = app;