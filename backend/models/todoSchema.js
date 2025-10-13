const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    status : {
      type: Boolean,
      default: false,
    },  
    dueDate: { type: String },
    dueTime: {
      type: [String, Date],
      trim : true
    },
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // if you’re linking todos to users
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
