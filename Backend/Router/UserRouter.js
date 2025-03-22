const express = require('express');
const UserRouter = express.Router();
const { register, signin, getinfo, logout } = require('../Controller/UserController');
const isAuthenticated = require('../middleware/auth');

UserRouter.post('/register', register);
UserRouter.post('/login', signin);
UserRouter.post('/logout', isAuthenticated, logout);
UserRouter.post('/getuser', isAuthenticated, getinfo);

module.exports = UserRouter;