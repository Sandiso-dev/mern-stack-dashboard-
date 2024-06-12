const express = require('express');
const router = express.Router();
const {getData} = require('../controllers/dataControllers');

//OFICIAL ROUTER TO GET ALL THE DATA IN MY MONGODB DATABASE 
router.get('/data', getData);
module.exports = router;