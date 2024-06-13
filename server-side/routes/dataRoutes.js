const express = require('express');
const router = express.Router();
const { getData } = require('../controllers/dataControllers');

//OFICIAL ROUTER TO GET ALL THE DATA IN MY MONGODB DATABASE 
router.get('/data', async (req, res) => {
    //UPDATED GET ROUTE TO LOG THE PROCESS 
    //TO TROUBLESHOOT ERROR RECEIVING DATA IN MY FRONTEND
    try{
        const data = await getData(req, res);
        //console.log('DATA SENT TO CLIENT', data);
        res.json(data);
    } catch (err) {
        console.log('ERROR IN ROUTE HANDLER', err);
        res.status(500).json({message: err.message});

    }
});
module.exports = router;