const mgongoose = require('mongoose');

const connectDB = async () => {
    try{
       const conn =  await mgongoose.connect(process.env.MONGO_URI );
        console.log(`MONGODB CONNECTED SUCCESSFULLY: ${conn.connection.host}`);
    } catch(err){
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;