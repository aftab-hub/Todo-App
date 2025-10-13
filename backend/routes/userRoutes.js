const express = require('express');
const router = express.Router();
const userController = require("../controllers/userControllers")
const {checkAuth} = require("../middleware/auth");

router.post("/register", userController.register);
router.post("/login",  userController.login);
router.get("/profile", checkAuth, userController.getProfile);





module.exports = router;
