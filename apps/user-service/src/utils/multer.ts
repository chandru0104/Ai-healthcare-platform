import multer from  "multer"


const upload = multer.discstrorage({})

export const uploader = multer.upload({
    upload,
    folder:"profile"
})