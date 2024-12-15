const express = require('express');
const routes = express.Router();
const {saveContact, getContacts} = require('../controllers/contactController') 

routes.post('/saveContact',saveContact)
routes.get('/getContacts', getContacts)

module.exports = routes;