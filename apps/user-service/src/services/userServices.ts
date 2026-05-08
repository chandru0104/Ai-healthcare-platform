import { User } from "../models/userModel"
import bcrypt from "bcrypt"
import env from "dotenv"
import { validationError } from "../utils/errorHandler"
import cloudinary from "cloudinary"

env.config()

export const userAddService = async (data: any) => {

        const { name, email, password, role, profile, experience, licence_no, degree, specialist, about, registration, phone, location, language,price,comment,star,schedule } = data

        const salt = 10

        const hashPassword = await bcrypt.hash(password, salt)

        if(role=="user"){
                const user = await User.create({ name, email, password: hashPassword, role })
                const responseUser= await User.findById(user._id).select("-language -schedule -password -__v")

                return responseUser
               
        }

        if(role=="delivery boy"){
                const deliver_boy = await User.create({name, email, password: hashPassword, role})

                const response_deliver_boy = await User.findById(deliver_boy._id).select("-language -schedule -password -__v")
                return response_deliver_boy
        }


        if(role=="admin"){
                const admin = await User.create({name,email,password: hashPassword ,role})
                const resposneAdmin = await User.findById(admin._id).select("-language -schedule -password -__v  ")

                return resposneAdmin
        }

        if(role=="doctor"){

        const doctor = await User.create({ name, email, password: hashPassword, role, profile, experience, licence_no, degree, specialist, about, registration, phone, location, language,price,comment,star,schedule })

        if(data.file){
                const fileUpload = cloudinary.uploader.upload(data.file.path),{
                      folder :"profile",
                }
        }

        return doctor
        }

        throw new Error("Invalid user")

}


export const userAllListService = async (): Promise<any> => {
        try {
                const user = await User.find({ status: 1 })
                return user
        } catch (error: any) {
                throw new validationError(error.message)
        }


}

export const userDeleteService = async (id: any) => {
        try {
                const deleteUser = await User.findByIdAndUpdate(id, { status: 0 }, { new: true })
                return deleteUser
        } catch (error: any) {
                throw new validationError(error.message)
        }
}

export const userProfileService = async (id: any) => {
        try {
                const UserProfile = await User.findById(id)
                return UserProfile
        } catch (error: any) {
                throw new validationError(error.message)
        }

}


export const userUpdateService = async (id: any, data: any) => {
        try {
        const updateData = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true })
        if (!updateData) {
                throw new validationError("User not update data")
        }
        return updateData
        } catch (error: any) {
                throw new validationError(error.message)
        }
}