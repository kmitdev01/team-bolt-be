require("dotenv").config();
var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('User');

//!Creating a Middleware
const verifyUser = async(req, res, next) => {
    //console.log(req.headers.authorization);
    try {
        const decode = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRETE_KEY

        );
        let userData = await User.findOne({ _id: decode.id });

        if (userData) {
            //req.body.id = decoded.id;
            next();

        }


    } catch {
        return res.json({
            message: "User is UNAUTHENTICATED!",

        });
        // res.json("UNAUTHENTICATED");
    }
};

module.exports = { verifyUser };