const express = require("express")
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    // name : String,

     name : {
        // client side, server-side, database (data validation)
        type : String,
        required : [ true, "name is mandatory"],
        allowNull : true,
      //   defaultValue : "jack" ,
        unique : true,
         
     },
     email : {
     
        type : String,
        required : [ true, "Email is mandatory"],
        allowNull : true,
      //   defaultValue : ""

         
     }, 
     password : {
     
        type : String,
        required : [ true, "password is mandatory"],
        allowNull : false,
      //   defaultValue : ""
         
     },
     number : {
        
        type : String,
        required : [false, "number is optional"],
        allowNull : true,
      //   defaultValue : ""
         
     }, 
     role : {
      type : String,
      required : false,                               
      allowNull : true,
      default : "admin"
     }
})  

const User = mongoose.model("User", userSchema);

module.exports = User;



