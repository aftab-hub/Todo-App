 const mongoose = require("mongoose")

 const productSchema = new mongoose.Schema({
     category:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "Category",
         required: true
        },
        name:{
            type:String,
            required: true
        },
        // productImage:[{
           //     type: String
           // }]
           
           // or
        productImage:{
         type: String,
     },
     price:{
         type: Number,
         default: 0
     },
    description:{
        type:String,
        required: true
    },

    stock:{
        type: Number,
        default: 0
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    

 },{timestamps:true})

 const Product = mongoose.model("Product", productSchema)

module.exports = Product