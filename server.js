require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db.js");

connectDB();

app.use(express.json());
app.use(cors());


const expenseRoute = require("./routes/expenseRoutes.js");
const userRoute = require("./routes/userRoutes.js")

app.use("/api",expenseRoute);
app.use("/api", userRoute);

const port = process.env.PORT;

app.listen(port,()=>{
    console.log("Server running");
})