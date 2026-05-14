import { User } from "../models/userModel"
import bcrypt from "bcrypt"
import env from "dotenv"
import { validationError } from "../utils/errorHandler"
import cloudinary from "../utils/cloudinary"
import { redis } from "../utils/redis"
import { sendMail } from "../kafkaProducer/producer"
env.config()


export const otpSet = async (data: any) => {

        const { email, passowrd } = data

        if (!email || passowrd) {
                throw new validationError("Fill require filed")
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const hashOtp = await bcrypt.hash(otp, 10)

        await redis.setex(
                `email:${email}`,
                300,
                JSON.stringify({
                        email,
                        otp: hashOtp,
                })

        )
        sendMail(email, otp)

}

//add user service
export const userAddService = async (data: any) => {

        const { name, email, password, role, experience, userOtp, licence_no, degree, specialist, about, registration, phone, location, language, fees, comment, star, schedule } = data

        const salt = 10

        const hashPassword = await bcrypt.hash(password, salt)



        if (role == "user") {

                const getOtp: any = await redis.get(`email:${email}`)
                if (!getOtp) {
                        throw new Error("Expired OTP")
                }

                const verify = await bcrypt.compare(userOtp, getOtp.otp)

                if (!verify) {
                        throw new Error("Invalid OTP")
                }
                await redis.del(`email:${email}`)

                const user = await User.create({ name, email, password: hashPassword, role })
                const responseUser = await User.findById(user._id).select("-language -schedule -password -__v")

                return responseUser

        }

        if (role == "delivery boy") {


                const deliver_boy = await User.create({ name, email, password: hashPassword, role })

                const response_deliver_boy = await User.findById(deliver_boy._id).select("-language -schedule -password -__v")
                return response_deliver_boy
        }


        if (role == "admin") {

                const admin = await User.create({ name, email, password: hashPassword, role })
                const resposneAdmin = await User.findById(admin._id).select("-language -schedule -password -__v  ")

                return resposneAdmin
        }

        if (role == "doctor") {

                let profileImage = ""
                if (data.file) {
                        const fileUpload = await cloudinary.uploader.upload(data.file.path, {
                                folder: "profile",
                        }
                        )
                        profileImage = fileUpload.secure_url

                }

                const doctor = await User.create({ name, email, password: hashPassword, role, profile: profileImage, experience, licence_no, degree, specialist, about, registration, phone, location, language, fees, comment, star, schedule })
                const responseUser = await User.findById(doctor._id).select("-password -__v")
                return responseUser
        }

        throw new Error("Invalid user")

}

//user all list services
export const userAllListService = async (): Promise<any> => {
        try {
                const user = await User.find({ status: 1 })
                return user
        } catch (error: any) {
                throw new validationError(error.message)
        }
}

//user delete services
export const userDeleteService = async (id: any) => {
        try {
                const deleteUser = await User.findByIdAndUpdate(id, { status: 0 }, { new: true })
                return deleteUser
        } catch (error: any) {
                throw new validationError(error.message)
        }
}


//user profile services
export const userProfileService = async (id: any) => {
        try {
                const UserProfile = await User.findById(id)
                return UserProfile
        } catch (error: any) {
                throw new validationError(error.message)
        }

}

//user update services
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