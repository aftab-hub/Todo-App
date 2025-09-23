const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userRoutes = require("./routes/user");
const auth = require("./middleware/auth")



const app = express();
    

app.use(express.json({extended : true, limit : "5mb"}));
app.use(bodyParser.json({extended : true, limit : "5mb"}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors({origin : "https://todoapp-frontend-33ow.onrender.com"}));



 
mongoose.connect(process.env.db_url)
.then(()=>{
    app.listen(process.env.port,()=>{
        console.log(`Welcome to this Server is up and running on port ${process.env.port}`);
        console.log("server is connected to Database");
    })
    
})
.catch((err)=>{
    console.log(err);
});


app.use("/user", userRoutes);

app.use("/",(req, res, next)=>{
    res.send(`Welcome to server side running on port ${process.env.port}`)
});


















