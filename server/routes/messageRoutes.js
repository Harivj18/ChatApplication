const express = require('express');
const routes = express.Router();
const {sentMessage, getMessages} = require('../controllers/messageController');
const {protectRoutes} = require('../midddlewares/protectRoutes')

routes.post('/sentMessage', protectRoutes, sentMessage);

routes.post('/getMessages', protectRoutes, getMessages)


module.exports = routes;