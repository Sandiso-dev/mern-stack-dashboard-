const Data = require('../models/Data');

const getData = async (req, res) => {
    try{
        const data = await Data.find();
       // console.log('DATA FETCHED FROM DB:'. data);
        return data;
        
    }catch(err){
        res.status(500).json({ message: err.message});
    }
};

module.exports = { getData };