const multer = require("multer");
const fs = require("fs");
const path = require("path");

const dir = path.resolve(path.join(__dirname, "../uploads"));

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
const maxSize = 12 * 1000 * 1000;
const maxCount = 5;

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.resolve(__dirname, "../uploads"));
  },
  filename: function (req, file, callback) {
    const newName = file.originalname.split(".")[0]+Date.now()+"."+file.originalname.split(".")[file.originalname.split(".").length-1];
    
    callback(null, newName);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, callback) {
    const mimeTypeList = [
      "image/jpg",
      "image/jpeg",
      "image/x-png",
      "image/png",
      "image/gif",
      "image/svg+xml",
      "text/csv",
    ];
    if (mimeTypeList.indexOf(file.mimetype) <= -1) {
      const cusError = new Error("File type is invalid");
      cusError.code = "INVALID_FILE_TYPE";
      cusError.field = file.fieldname;
      return callback(cusError);
    } else {
      return callback(null, true);
    }
  },
});
exports.upload = upload;
exports.maxCount = maxCount;
