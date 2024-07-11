import fs from "fs";
import multer from "multer";

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = "./uploads/";
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });