const Controller = require("../Controllers/Controller")
const {uploaded} = require("../middlewares/multer")
const express = require("express")
const router = express.Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })


router.post('/register', upload.fields([
  { name: 'avatar', maxCount: 1 }, 
  { name: 'coverImage', maxCount: 1 }
]), Controller.registerUser);
router.post("/login",Controller.loginUser)
router.post("/create",Controller.createUser)


module.exports = router