import multer from "multer";
import path from "path";
import fs, { mkdirSync } from "fs"


 const upoladPath = path.resolve("/app/user-service/uploader")

 if(!fs.existsSync(upoladPath)){
    mkdirSync(upoladPath,{recursive:true})
 }
const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, upoladPath);
    },

    filename: function (req, file, cb) {

        const filename = Date.now() + "-" + file.originalname;

        cb(null, filename);
    }
});

export const uploader = multer({
    storage
});