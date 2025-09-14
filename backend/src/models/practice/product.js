const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    category:{
        typs: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    name:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        default: 0
    },
    stock:{
        type:Number,
        default: 0
    },
    description:{
        type:String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId
    }

},{timestamps:true})

export const Product = mongoose.model("Product",productSchema)