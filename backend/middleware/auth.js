const User = require("../models/userSchema")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const checkAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Kindly login first" });
    }
    // Extract token from header
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify token

    // Attach decoded user info to request
    req.user = decoded;  

    next();
  } catch (err) {
    return res.status(403).json({
      message: err.message || "Unauthorized access",
    });
  }
};

const checkAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const check = jwt.verify(token, process.env.SECRET_KEY);
    const user = User.findOne({
      email: check?.user?.email,
    });
    if (check?.user.role === "admin") {
      // console.log("Inside admin role");
      next();
        }else {
            return res.status(403).json({
                message : "You are not allowed to this route"
            })
        }

    } catch (err) {
        res.status(401).json({
            message : "Unauthorized"
        })
    }
}
module.exports = {
    checkAuth
}

