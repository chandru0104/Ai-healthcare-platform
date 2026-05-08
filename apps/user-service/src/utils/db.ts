import mongoose from "mongoose"
import env from "dotenv"

env.config()

export const connectDB =async()=>{
    try{
    await mongoose.connect(process.env.DB_URL as string)
    console.log("DB connected")
    }catch(error:any){
        console.error(error.message)
    }
}