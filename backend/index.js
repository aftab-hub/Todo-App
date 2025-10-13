const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");




const app = express();
   
// this is for testing purpose

app.use(express.json({extended : true, limit : "5mb"}));
app.use(bodyParser.json({extended : true, limit : "5mb"}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors({origin : true}));


mongoose.connect(process.env.DB_URL)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Welcome to this Server is up and running on port ${process.env.PORT}`);
        console.log("server is connected to Database");
    })
    
})
.catch((err)=>{
    console.log(err);
});


app.use("/todo", todoRoutes);
app.use("/user", userRoutes);

app.use("/",(req, res, next)=>{
    res.send(`Welcome to server side running on port ${process.env.PORT}`)
});


















