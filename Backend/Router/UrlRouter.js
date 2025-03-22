const express = require('express');
const UrlRouter = express.Router();
const { CreateUrl, SendUrl, UserUrls, View, UrlDelete, Update } = require('../Controller/UrlController');
const isAuthenticated = require('../middleware/auth');

UrlRouter.post('/create', isAuthenticated, CreateUrl);
UrlRouter.post('/view/:id', SendUrl);
UrlRouter.post('/user-get', isAuthenticated, UserUrls);
UrlRouter.post('/viewUrl/:id', View);
UrlRouter.post('/update/:id', Update);
UrlRouter.post('/delete/:id', UrlDelete);

module.exports = UrlRouter