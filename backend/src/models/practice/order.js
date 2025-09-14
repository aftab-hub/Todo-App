const mongoose = require("mongoose")

const orderItmeSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity:{
        type:Number,
        required: true
    }
})
const orderSchema = new mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderItem:{
        type:[orderItmeSchema]
    },
    orderPrice:{
        type:Number,
        required: true
    },
    status:{
        type : String,
        enum: ["Pending", "Cancllled", "Delivered"],
        default: "Pending"
    },
    address:{
        type: String,
        required: true
    }

},{timestamps:true})

export const Order = mongoose.model("Order",orderSchema)