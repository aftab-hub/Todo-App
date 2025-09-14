const multer = require("multer")
// const upload = multer({ dest: 'uploads/' })


const storage = multer.diskStorage({
    destination: function (req, files, cb) {
      cb(null, "./Public/temp")
    },
    filename: function (req, file, cb) {

      cb(null, file.originalname)
    }
  })
  
  const uploaded = multer({ 
  storage,
})

module.exports = uploaded