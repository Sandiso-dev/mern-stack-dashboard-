const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const dataRoutes = require('./routes/dataRoutes');
const Data = require('./models/Data');

//INITIALIING MY SERVER, EXPRESS, CORS, CONNECTING TO DB , SCHEMAR/MODEL AND ROUTE
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', dataRoutes);


//IMPORT FUNCTION TO MIGRATE THE DATA IN THE GIVEN JSON FILE
const importData = async () => {
    try{
        await Data.deleteMany();
        await Data.insertMany(require('./data/jsondata.json'));
        console.log('DATA IMPORT SUCCESSFULL');
        process.exit(1);
    } catch(err){
        console.error(`ERROR: ${err.message}`);
    }
};

//importData();

//app.get('/test', (req, res) => {
//    res.send('Server is working!!')
//});

const PORT = process.env.PORT || 5000;
console.log(`MONGO URL: ${process.env.MONGO_URI}`);
app.listen(PORT, console.log(`SERVER RUNNING ON PORT ${PORT}`));