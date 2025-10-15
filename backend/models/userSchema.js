const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is mandatory"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is mandatory"],
  },
   profileImage: {
    type: String, // Cloudinary URL
    default: "",
  },
});

// ✅ Virtual field for auto avatar (first letter of name)
userSchema.virtual("avatar").get(function () {
  if (this.name) {
    return this.name.charAt(0).toUpperCase();
  }
  return "?";
});

const User = mongoose.model("User", userSchema);
module.exports = User;
