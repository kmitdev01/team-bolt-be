const jwt = require("jsonwebtoken");
var errorHandler = require('./errorController.js');
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const auth = require("../middleware/auth.js");
require("dotenv").config();

/////////// Register Function /////////////////////////////

const register = function(req, res) {
    var newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
        if (err) {
            try {
                if (err.name === 'ValidationError') return err = errorHandler.handleValidationError(err, res);
                if (err.code && err.code == 11000) return err = errorHandler.handleDuplicateKeyError(err, res);
            } catch (err) {
                res
                    .status(500)
                    .send('An unknown error occurred.');
            }

        } else {
            user.password = undefined;
            return res.json(user);
        }
    });
}

/////////////////////Token Generate Function/////////////////

const generateToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRETE_KEY);
};

//////////////////// Login Function ///////////////////////////

const login = async(req, res) => {
    //console.log('testtttttt');
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) { return res.status(400).send({ status: 400, message: "User not found" }) };
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) { return res.status(400).send({ status: 400, message: "Invalid password." }); }
        user.password = undefined;
        res.send({ user, token: generateToken(user.id) });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};





// const getUsers = async(req, res) => {
//     try {
//         const user = await User.find({}, { password: 0 }).populate("role", ["_id", "roleName", "status"]);
//         res.send({ user });
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// };

module.exports = {
    register,
    login

};