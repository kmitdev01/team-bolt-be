const router = require("express").Router();
var userHandlers = require('../controllers/userController.js');
//var authUser = require('../middleware/auth.js');

router.post("/register", userHandlers.register);
router.post('/login', userHandlers.login);
//router.get('/users', userHandlers.getUsers);
//router.delete('/users', authUser.verifyUser, userHandlers.deleteUser);
//router.patch('/users', authUser.verifyUser, userHandlers.updateUser);

module.exports = router;