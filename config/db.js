require('dotenv').config();
const mongoose = require("mongoose");

const url = process.env.MONGO_URI
;
const connectDB = async () => {
    try{
        await mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
        console.log("Connected Successfully!");
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports=connectDB;