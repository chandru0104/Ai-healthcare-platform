import cloudinary from "cloudinary"
import dotenv from "dotenv"

dotenv.config()

cloudinary.config({
    cloudinary_cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key : process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret : process.env.CLOUDINARY_API_SECRET

})
export.module = cloudinary