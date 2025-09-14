const User = require("../models/userSchema")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const checkAuth = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,process.env.secret_key);
        next();
    } catch (err) {
        return res.status(403).json({
            message : "Kindly login First",
        })
    }
}
const checkAdmin = (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const check = jwt.verify(token,process.env.secret_key)
        const user = User.findOne({
            email : check?.user?.email,
        })
        if(check?.user.role === "admin"){
            // console.log("Inside admin role");
            next()  
        }else {
            return res.status(403).json({
                message : "You are not allowed to this route"
            })
        }

    } catch (err) {
        res.status(401).json({
            message : "Unauthorized"
        })
    }
}
module.exports = {
    checkAuth,
    checkAdmin
}

