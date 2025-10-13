const User = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const register = async(req, res, next)=>{
    try {
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User with given Email address already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            name,
            email,
            password : hashedPassword,
        })
     

        const payload = { id: newUser._id, email: newUser.email };
        const token = jwt.sign(payload,process.env.SECRET_KEY,{
        expiresIn : "1h"
     })

      await newUser.save();
      return res.status(201).json({
          message : "User created successfully",
          result : {
            id : newUser._id,
            name : newUser.name,
            email : newUser.email,
          },
          token : token
      })
} catch (err) {
     return res.status(500).json({
        message : err.message,
     })
}
}

const login = async(req, res)=>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({ email })
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
        const payload = { id: user._id, email: user.email }
        const token = jwt.sign(payload,process.env.SECRET_KEY,{
         expiresIn : "1h"
        })
        return res.status(200).json({
            message : "Login successful",
            result : {
                id : user._id,
                name : user.name,
                email : user.email,
            },
            token : token
        })
    } catch (err){
      return res.status(500).json({
        message : err.message
      })
    }
}

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const firstLetter = user.name.charAt(0).toUpperCase();

    res.json({
      success: true,
      data: {
        profileLetter: firstLetter,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// ✅ Logout
 const logout = (req, res) => {
  res.json({ message: "User logged out successfully" });
};


module.exports = {
    register,
    login,
    getProfile,
  
}