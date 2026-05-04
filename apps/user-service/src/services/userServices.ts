import { User } from "../models/userModel"
import bcrypt  from "bcrypt"
import env from "dotenv"

env.config()

export const createUser =async(data:any)=>{
    
        const {name,email,password,role,profile}=data
    
        const salt = 10
     
        const hashPassword = await bcrypt.hash(password,salt)
         
        const user = await User.create({name,email,password : hashPassword,role,profile})
        
        return user
    
       
        }