const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    // avatar:{
    //     type: String,
    //     required: false,
    // },
    // coverImage:{
    //     type:String
    // },
    // watchHistory:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Video"
    // }],
    // refreshToken:{
    //     type:String
    // },
    name:{
        type:String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
        unique: true,
    },
    number:{
        type:String,
        required: false,
        unique: true,
    }
},{timestamps: true})



const User = mongoose.model("User", userSchema)

module.exports = User