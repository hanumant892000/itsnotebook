const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({

  destination: (req, file, cb) => cb(null, 'uploads'), // Folder location
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const fileName = "note" + Date.now() + ext
    console.log(fileName)
    cb(null, fileName);
  }

});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = upload