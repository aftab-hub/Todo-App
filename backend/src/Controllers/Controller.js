const User = require("../models/eCommerce/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const upload = require("../middlewares/multer")
const uploadOnCloudinary = require("../utils/cloudinary")

const createUser = async(req, res, next)=>{
    
   const user = req.body;
   const newUser = new User(user)
try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password ,salt)
  
    newUser.password = hashedPassword
   
    await newUser.save()
    return res.status(201).json({
        message : "User created successfully",
        result : newUser
    })
} catch (error) {
    return res.status(500).json({
        message : error.message
    })
}
   
}



const registerUser = async(req, res, next)=>{

  const {name, email, password} = req.body
  // const newUser = new User({name, email})
  if ([name,email].some((field)=>field?.trim() === "")) {
    return res.status(400).json({
     message : "all fields required"
    })
  }
  try {
    const existedUser = await User.findOne({
      $or: [{name}, {email}]
    })
    if (existedUser) {
      return res.status(400).json({
        message : "user existed",
      })
    }
    const avatarLocalPath = await req.files?.avatar[0]?.path
    console.log(req.files);
    
    const coverImageLocalPath = await req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
      return res.status(400).json({
        message : "Avatar is required",
      })
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
      return res.status(404).json({
        message : "Failed to upload avatar",
      })
    }
    const createUser = await User.find({
      name,
      email,
      password,
      avatar: avatar?.url,
      coverImage : coverImage?.url,

    })
    const userResponse = await User.findById(createUser._id).select("-password -refreshToken")
    if (!userResponse) {
      return res.status(500).json({
        message : "Something went wrong while user registering",
      })
    }
     await userResponse.save()
     return res.status(201).json({
      message : "user created successfully",
      result : userResponse
    })
      
    
  } catch (error) {
    return res.status(500).json({
    message : "something went wrong"
    })
  }
  }
  
  const loginUser = async(req,res,next)=>{

    const {email,password} = req.body
    try {
      const user = await User.findOne({
        email: email
      })
      if (!user) {
        return res.status(404).json({
          message: "user not found"
        })
      }
      const isPasswordCorrect = await bcrypt.compare(password,user.password)
      if (!isPasswordCorrect) {
        return res.status(400).json({
         message : "invalid Password"
        })
      }
      const payload = {user}
      console.log("this is payload",payload);
      const token = jwt.sign(payload,process.env.secret_key)
      return res.status(200).json({
        message: "user login"
      })
      
    } catch (error) {
      return res.status(500).json({
        message: message.error
      })
    }
  } 

 


module.exports = {
    registerUser,
    loginUser,
    createUser

}