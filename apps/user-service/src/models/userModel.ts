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
        required:[true,"password is require"]
    },
    role:{
         type:String,
         enum: ["user", "doctor", "delivery boy", "admin"],
         required:[true,"role is require"]
    },
    profile:{
        type:String
    },
    experience:String,
    licence_no:String,
    degree:String,
    about:String,
    specialist:String,
    registration:String,
    phone:Number,
    location:String,
    fees:Number,
    comment:String,
    star:String,
    schedule:{
        type:[String],
        default:[]
    },
    language:{
        type:[String],
        default:[]
    },
    is_active:{
        default:1,
        type:Number
    },
    status:{
        default:1,
        type:Number
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
    }
},{ timestamps:true})


export const User =mongoose.model("User",userModel)