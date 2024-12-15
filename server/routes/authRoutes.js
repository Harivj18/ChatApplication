const express = require('express');
const routes = express.Router();
const {signup, login, logout, forgotPassword, resetPassword} = require('../controllers/authController');
const {authCheck} = require('../midddlewares/protectRoutes')

routes.post('/signup',signup)
routes.post('/login',login)
routes.post('/logout',logout)
routes.post('/forgot-password',forgotPassword)
routes.post('/reset-password',resetPassword)
routes.get('/authCheck', authCheck)

module.exports = routes;