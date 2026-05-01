import jwt from "jsonwebtoken"
import env from "dotenv"
import {authError} from "../errorHandler/errorHandler"
env.config()


export const authMiddleware =(req:any , res:any , next:any)=>{

    try{
        const authHeader = req.headers.authorization

        if(!authHeader||!authHeader.startsWith("Bearer ")){
            throw new authError("Invalid formet token")
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token,process.env.JWT_ACCESS_KEY as string)

        req.user=decoded
        
        next()

    }catch(error){
        throw new authError("Invalid or token is expired")
    }
    
}