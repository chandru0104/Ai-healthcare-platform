import {redis} from "../utils/redis"
import bcrypt from "bcrypt"


export const redisSet=async(data:any)=>{
          const {email}=data
         const generateOtp= Math.floor(10000+Math.random()*90000).toString()
         const hashOtp = bcrypt.hash(generateOtp,10)
          await redis.setex(
             `email:${email}`,
             300,
             hashOtp
          )
          return generateOtp
}








