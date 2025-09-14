const mongoose = require("mongoose")

// this func is for below orderItems
const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Product"
    },
    quantity: {
        type: Number,
        required : true
    }
})


const orderSchema = new mongoose.Schema({
    Customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    orderPrice: {
        type: Number,
        required: true
    },
    orderItems: {
        type: [orderItemSchema]
    },
    address: {
        type : String,
        required: true
    },
    status: {
        type: String,
        enum : ["Pending", "Cancelled", "Delivered"],
        default: "Pending"
    }


},{timestamps: true})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order