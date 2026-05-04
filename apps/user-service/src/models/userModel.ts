import mongoose from "mongoose";
import validator from "validator"

const userModel = new mongoose.Schema({
    name : String,
    email:{
        unique:true,
        validation : [validator.isEmail ,"Email require" ],
        type:String,
        require:true
    },
    password:{
        type:String,
        select:false,
        require:true
    },
    role:{
         type:String,
         enum: ["user", "doctor", "delivery boy", "admin"],
         require:true
    },
    profile:{
        type:String
    }


})


export const User =mongoose.model("User",userModel)