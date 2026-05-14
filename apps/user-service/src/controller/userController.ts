import { validationError } from "../utils/errorHandler"
import { userAddService, userAllListService, userDeleteService, userProfileService, userUpdateService,otpSet } from "../services/userServices"
import { Request, Response } from "express"



export const otpSetController = async (req:Request, res: Response)=>{
    
   const result = await otpSet({...req.body})
   res.json({
    success :true,
    message:"send otp",
     result
   })
}

//user add
export const userAddController = async (req: Request, res: Response) => {
    try {
        const { email, password, role, experience, licence_no, degree, specialist, about, registration, phone, location, language,fees,schedule } = req.body

        if (!email || !password || !role) {
            throw new validationError("Must fill the require feild")
        }

        if (role === "doctor") {
            if (!email || !password || !role||!req.file || !experience || !licence_no || !degree || !specialist || !about || !registration || !phone || !location || !language||!fees||!schedule) {
                throw new validationError("Must fill the require feild")
            }
        }
        
        const user = await userAddService({...req.body,file: req.file})

        res.status(201).json({
            success: true,
            data: user
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            mesaage: error.message
        })
    }
}

//user list
export const userListController = async (req: Request, res: Response) => {

    try {
        const user = await userAllListService()

        res.status(200).json({
            success: true,
            message: "User listed successfully",
            data: user
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
            
        })
    }
}

//user delete
export const userDeleteController = async (req: Request, res: Response) => {

    try {
        const { id } = req.params   

        if (!id) {
            throw new validationError("Please select user")
        }

        await userDeleteService(id)

        res.status(200).json({
            success: true,
            message: "User deleted"
           
        })


    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            
        })

    }

}

//user profile
export const userProfileController = async (req: Request, res: Response) => {

    try {
        const { id } = req.params
        if (!id) {
            throw new validationError("Invalid user")
        }
        const user = await userProfileService(id)
        res.status(200).json({
            success: true,
            message: "user profile",
            data: user,
        })
    } catch (error: any) {
        throw new validationError(error.message)
    }
}

///user update
export const userUpdateController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = req.body

        const updatedData = await userUpdateService(id, data)

        res.status(201).json({
            success: true,
            message: "User data updated",
            data: updatedData
        })
    } catch (error: any) {
        throw new validationError(error.message)
    }
}