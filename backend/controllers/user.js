const User = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createUser = async(req, res, next)=>{
//    const name = req.body;
//    const email = req.body;
//    const password = req.body;
//    const number = req.body;
 
// const {name, email, password, number} = req.body;

const user = req.body;
const newUser = new User(user)

 try {
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(user.password,salt);    
newUser.password = hashedPassword;

    await newUser.save();
    return res.status(201).json({
        message : "user Created successfully",
        result : newUser
    })
} catch (err) {
     return res.status(500).json({
        message : err.message,
     })
}
}


const deleteUser = async(req,res)=>{
    const id = req.params.id;
    const deleteValues = req.body
    try {
        const user =  await User.findOne({
            _id : id
        })
        if(!user){
            return res.status(404).json({
                message : "User not found",
             
            })
        }
       await User.findByIdAndDelete(id,deleteValues);
        return res.status(200).json({
            message : "User Deleted Successfully"  
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

const updateUser = async(req, res)=>{
    const id = req.params.id
    const updateValues = {...req.body} // we are taking copy of the user data from the req.body 
    try {
        const user = await User.findOne({
            _id : id
        })
        if(!user){
            return res.status(200).json({
                message :"User not found",
            });
        };

        if(updateValues.password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(updateValues.password, salt);
            updateValues.password = hashedPassword;
        }
      const updateUser = await User.findByIdAndUpdate(id,updateValues, {
        new : true
       })

       return res.json({
        message : "user update successfully",
          result : updateUser
       })


      
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}


const loginUser = async(req, res)=>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({
            email: email,
        })
        if(!user){
            return res.status(404).json({
             message : "User with given Email address does not Exist",
            })
        }
        const isPasswordCorrect  = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({
                message : "Invalid password",
            })
        }
        const payload = { user }
        const token = jwt.sign(payload,process.env.secret_key,{
         expiresIn : "1h"
        })
        return res.status(200).json({
            message : "Login Successful",
            token : token
        })
    } catch (err){
      return res.status(500).json({
        message : err.message
      })
    }
}


const getAllUsers = async(req, res)=>{
    try {
        const users = await User.find({})
        return res.status(200).json({
            message : "User Fetched",
            result : users,
            count : users.length
        }) 
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
    
}

module.exports = {
    createUser, 
    deleteUser,
    getAllUsers,
    updateUser,
    loginUser
}


