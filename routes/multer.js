const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === 'imageFile') {
        cb(null, 'uploads/images/');
      } else if (file.fieldname === 'audioFile') {
        cb(null, 'uploads/audios/');
      } else {
        cb(new Error('Invalid fieldname'));
      }
    },
    filename: function (req, file, cb) {
      let uniquename = uuidv4()
      cb(null, uniquename + path.extname(file.originalname));
    }
  });
  
  // Multer upload instance
  module.exports = upload = multer({ storage: storage });
  