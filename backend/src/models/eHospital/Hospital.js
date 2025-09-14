const mongoose = require("mongoose")

const hospitalSchema = new mongoose.Schema({
    hospitalName:{
       type: String,
       required: true
    },
    addressLine1:{
       type: String,
       required: true
    },
    addressLine2:{
       type: String,
    },
    city:{
       type: String,
       required: true
    },
    pincode:{
       type: String,
       required: true
    },
    specializedIn:[{
        type: String
    }]

},{timestamps: true})

export const Hospital = mongoose.model("Hospital", hospitalSchema)