import {redis} from "../utils/redis"

export const getOtp =async (email:any)=>{
       try{
        await redis.get(`email:${email}`)
        300
        JSON.stringify()

       }
}