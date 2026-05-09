import { Router } from "express";
import {userAddController,userListController,userDeleteController,userProfileController,userUpdateController} from "../controller/userController" 
import {uploader} from "../utils/multer"
const router = Router()


router.post("/api/register",uploader.single("profile"),userAddController)
router.get("/api/user",userListController)
router.get("/api/user/profile/:id",userProfileController)
router.put("/api/user/update/:id",uploader.single("profile"),userUpdateController)
router.delete("/api/user/delete/:id",userDeleteController)



export default router