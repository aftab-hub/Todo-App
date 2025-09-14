const express = require("express");
const userController = require("../controllers/user")
const router = express.Router();
const {checkAuth,checkAdmin} = require("../middleware/auth")

router.post("/create", userController.createUser);
router.get("/getAll", userController.getAllUsers);
router.delete("/delete/:id", userController.deleteUser);
router.put("/update/:id", userController.updateUser);
router.post("/login", userController.loginUser);


module.exports = router;

