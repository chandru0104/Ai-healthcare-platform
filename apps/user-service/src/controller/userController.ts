
import { validationError } from "../errorHandler/errorHandler"
import {createUser} from "../services/userServices"

export const userServices = async(req:any,res:any)=>{
    try{
    const {email,password}=req.body

    if(!email && !password){
       throw new validationError("Must fill the Require feild")
    }


     
    const user = await createUser(req.body)

    res.status(201).json ({
        success:true,
        data:user
    })
    }catch(error:any){
        res.status(400).json({
            success:false,
            mesaage:error.message
        })
    }

}