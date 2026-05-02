import { userModel } from "../models/userModel"


export const createUser = (req:any,res:any)=>{
    const {name,email,password,role,profile}=req.body

    if(!email && password ){
       
    }
}