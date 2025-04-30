require('dotenv').config();
const mongoose = require("mongoose");

// const MONGO_URI = "mongodb+srv://kondamahesh1250:1234@cluster0.ljngk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/ExpenseTracker"
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