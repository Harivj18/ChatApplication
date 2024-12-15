const express = require('express');
const {protectRoutes} = require('../midddlewares/protectRoutes');
const routes = express.Router();
const getUsers = require('../controllers/userController')

routes.get('/getUsers', protectRoutes, getUsers)

module.exports =  routes;